<?php

namespace EWZ\Bundle\FormBuilderBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Form\FormView;

use EWZ\Bundle\FormBuilderBundle\Model\FormInterface;
use EWZ\Bundle\FormBuilderBundle\Model\FieldInterface;
use EWZ\Bundle\FormBuilderBundle\Model\CellInterface;
use EWZ\Bundle\FormBuilderBundle\Model\Field;

class FormController extends Controller
{
    /**
     * Embeds the form builder GUI.
     *
     * @param FormInterface $form The embeded Form (optional)
     *
     * @return Response A Response instance
     *
     * @Template()
     */
    public function embedAction(FormInterface $form = null)
    {
        return array(
            'form' => $form,
        );
    }

    /**
     * Previews a given form.
     *
     * @param FormInterface $form     A FormInterface instance (optional)
     * @param array         $assets   List of assets (field => value) (optional)
     * @param FormView      $formView A FormView instance (optional)
     *
     * @return Response A Response instance
     *
     * @Template("EWZFormBuilderBundle:Form:embed.html.twig")
     */
    public function previewAction(FormInterface $form = null, array $assets = array(), FormView $formView = null)
    {
        $fields = $form->getFields();
        foreach ($fields as $key => $field) {
            // remove error
            $fields[$key]->removeAttribute('error');
        }

        // assign assets values
        foreach ($assets as $name => $value) {
            foreach ($fields as $key => $field) {
                if ($field->getName() == $name) {
                    switch ($field->getType()) {
                        case Field::TYPE_TEXTBOX:
                        case Field::TYPE_TEXTAREA:
                            $fields[$key]->setAttribute('defaultValue', $value);
                            break;

                        case Field::TYPE_CHECKBOX:
                        case Field::TYPE_RADIO:
                        case Field::TYPE_DROPDOWN:
                            $fields[$key]->setAttribute('selected', $value);
                            break;
                    }
                }
            }
        }

        // mark all fields (in form) as rendered
        if ($formView) {
            foreach ($formView->getChildren() as $child) {
                foreach ($fields as $key => $field) {
                    if ($child->get('name') == $field->getName()) {
                        if ($child->get('errors')) {
                            $fields[$key]->setAttribute('error', current(current($child->get('errors'))));
                        }

                        switch ($field->getType()) {
                            case Field::TYPE_CHECKBOX:
                            case Field::TYPE_RADIO:
                            case Field::TYPE_DROPDOWN:
                                $choices = array();

                                foreach ($child->get('choices') as $choice) {
                                    $choices[] = sprintf("['%s', '%s']", $choice->value, $choice->label);
                                }

                                $fields[$key]->setAttribute('special', '');
                                $fields[$key]->setAttribute('special.dropdown', sprintf('[%s]', implode(', ', $choices)));                                

                                break;
                        }

                        $child = $child->setRendered();
                    }
                }
            }
        }

        return array(
            'formView' => $formView,
            'form'     => $form,
            'fields'   => $fields,
            'preview'  => true,
        );
    }

    /**
     * Saves a (new or exists) Form from the submitted data.
     *
     * @return Response A Response instance
     *
     * @Route("/save_form", name="ewz_form_builder_save_form")
     * @Method("POST")
     */
    public function saveFormAction()
    {
        $formManager  = $this->get('ewz_form_builder.manager.form');
        $fieldManager = $this->get('ewz_form_builder.manager.field');
        $cellManager = $this->get('ewz_form_builder.manager.cell');

        // get form properties
        $properties = (object)$this->get('request')->request->get('properties');

        $formProperties = $fieldsProperties = array();

        foreach ($properties as $property) {
            if ($property['type'] == 'form') {
                $formProperties = (object)$property;
            } else {
                // remove property 'id' if set, no need as the id is set automatically
                if (isset($property['id'])) unset($property['id']);

                $fieldsProperties[] = (object)$property;
            }
        }

        // get/create form
        if (!$formProperties->id || !$form = $formManager->findFormById($formProperties->id)) {
            $form = $formManager->createForm();
        }

        // set form properties
        $form->setName($formProperties->text ?: $this->get('translator')->trans('form.default_name'));
        $form->setAttributes(array(
            'width'      => $formProperties->width,
            'labelWidth' => $formProperties->labelWidth,
        ));

        // is default?
        $form->setDefault($formProperties->isDefault == 'Yes');

        // clear all fields
        $form->getRecord()->clear();

        // save form
        $formManager->saveForm($form);

        // add/update form fields
        foreach ($fieldsProperties as $item) {
            if (!$item->name || !$field = $fieldManager->findFieldBy(array('name' => $item->name))) {
                $field = $fieldManager->createField();
                $field->setName($item->name);
                $field->setType($item->type);
            }

            // get custom attributes
            $customAttributes = array();
            if (isset($item->column)) {
                $customAttributes['column'] = $item->column;
                unset($item->column);
            }
            switch ($item->type) {
                case Field::TYPE_HEAD:
                case Field::TYPE_TEXT:
                    break;

                case Field::TYPE_TEXTBOX:
                    $customAttributes['labelAlign'] = $item->labelAlign;

                    unset($item->labelAlign);

                    break;

                case Field::TYPE_TEXTAREA:
                    $customAttributes['labelAlign'] = $item->labelAlign;
                    $customAttributes['rows'] = $item->rows;
                    $customAttributes['cols'] = $item->cols;

                    unset($item->labelAlign);
                    unset($item->rows);
                    unset($item->cols);

                    break;

                case Field::TYPE_DROPDOWN:
                    $customAttributes['labelAlign'] = $item->labelAlign;
                    $customAttributes['size'] = $item->size;
                    $customAttributes['width'] = $item->width;

                    unset($item->labelAlign);
                    unset($item->size);
                    unset($item->width);

                    break;

                case Field::TYPE_RADIO:
                case Field::TYPE_CHECKBOX:
                    $customAttributes['labelAlign'] = $item->labelAlign;
                    $customAttributes['spreadCols'] = $item->spreadCols;

                    unset($item->labelAlign);
                    unset($item->spreadCols);

                    break;
            }

            // update attributes
            $field->setAttributes((array)$item);

            // save form
            $fieldManager->saveField($field);

            // add cell to form
            $cell = $cellManager->createCell($form, $field);
            $cell->setAttributes((array)$customAttributes);
            $cellManager->save($cell);

            $form->getRecord()->add($cell);
        }

        // re-save form (after all fields have been saved)
        $formManager->saveForm($form);

        return new Response(json_encode(array(
            'event' => 'form_builder:success',
            'data' => array(
                'form'   => $form->__toString(),
                'fields' => $fieldsProperties,
            ),
        )));
    }
}
