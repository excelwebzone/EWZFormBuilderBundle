<?php

namespace EWZ\Bundle\FormBuilderBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use EWZ\Bundle\FormBuilderBundle\Model\Field;

class FormController extends Controller
{
    /**
     * Saves a (new or exists) Form from the submitted data.
     *
     * @return Response A Response instance
     */
    public function saveFormAction(Request $request)
    {
        $formManager  = $this->get('ewz_form_builder.manager.form');
        $fieldManager = $this->get('ewz_form_builder.manager.field');
        $cellManager = $this->get('ewz_form_builder.manager.cell');

        // get form properties
        $properties = (object) $request->get('properties');

        $formProperties = $fieldsProperties = array();

        foreach ($properties as $property) {
            if ($property['type'] == 'form') {
                $formProperties = (object) $property;
            } else {
                // remove property 'id' if set, no need as the id is set automatically
                if (isset($property['id'])) unset($property['id']);

                $fieldsProperties[] = (object) $property;
            }
        }

        // get/create form
        if (!$formProperties->id || !$form = $formManager->findFormById($formProperties->id)) {
            $form = $formManager->createForm();
        }

        // set form properties
        $form->setName($formProperties->title ?: $this->get('translator')->trans('form.default_name'));
        $form->setAttributes(array(
            'formWidth'  => $formProperties->formWidth,
            'labelWidth' => $formProperties->labelWidth,
        ));

        // is default?
        $form->setDefaultFlag($formProperties->isDefault == 'Yes');

        // is enabled
        $form->setEnabled($formProperties->status == 'Enabled');

        // clear all fields
        foreach ($form->getCells() as $cell) $cellManager->deleteCell($cell);
        $form->getCells()->clear();

        // save form
        $formManager->saveForm($form);

        // reload form object
        $form = $formManager->findFormById($form->getId());

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

                case Field::TYPE_DATETIME:
                case Field::TYPE_TIME:
                case Field::TYPE_BIRTHDAY:
                    $customAttributes['labelAlign'] = $item->labelAlign;

                    unset($item->labelAlign);
                    unset($item->format);

                    break;

                case Field::TYPE_TEXTBOX:
                case Field::TYPE_FULLNAME:
                case Field::TYPE_EMAIL:
                case Field::TYPE_PHONE:
                case Field::TYPE_NUMBER:
                case Field::TYPE_MATRIX:
                case Field::TYPE_CALCULATION:
                default:
                    $customAttributes['labelAlign'] = $item->labelAlign;

                    unset($item->labelAlign);
            }

            // update attributes
            $field->setAttributes((array) $item);

            // save form
            $fieldManager->saveField($field);

            // add cell to form
            $cell = $cellManager->createCell($form, $field);
            $cell->setAttributes((array) $customAttributes);

            $form->getCells()->add($cell);
        }

        // re-save form (after all fields have been saved)
        $formManager->saveForm($form);

        return new Response(json_encode(array(
            'event' => 'form_builder:success',
            'data' => array(
                'id' => $form->getId(),
                'form'   => $form->__toString(),
                'fields' => $fieldsProperties,
            ),
        )));
    }

    /**
     * Wizard dialog.
     *
     * @return Response A Response instance
     */
    public function wizardAction(Request $request)
    {
        return $this->render('EWZFormBuilderBundle:Wizard:'.$request->get('type').'.html.twig', array(
            'field' => $request->get('field'),
            'data' => $request->get('data', array())
        ));
    }
}
