<?php

namespace EWZ\Bundle\FormBuilderBundle\Twig\Extension;

use Symfony\Component\Form\FormView;

use EWZ\Bundle\FormBuilderBundle\Model\FormInterface;
use EWZ\Bundle\FormBuilderBundle\Model\Field;

class FormBuilderExtension extends \Twig_Extension
{
    /**
     * @var array
     */
    private $resources;

    private $environment;

    /**
     * {@inheritdoc}
     */
    public function getFunctions()
    {
        return array(
            'ewz_form_builder_initialize' => new \Twig_Function_Method($this, 'initialize', array('is_safe' => array('html'))),
            'ewz_form_builder_embed' => new \Twig_Function_Method($this, 'formEmbed', array('is_safe' => array('html'))),
            'ewz_form_builder_preview' => new \Twig_Function_Method($this, 'formPreview', array('is_safe' => array('html'))),
        );
    }

    /**
     * {@inheritdoc}
     */
    public function initRuntime(\Twig_Environment $environment)
    {
        $this->environment = $environment;
    }

    /**
     * Initializes the global parameters needed to integrate the Form Builder.
     *
     * @param array  $parameters Additional parameters
     * @param string $template   The initialize template name (path)
     *
     * @return Response A Response instance
     */
    public function initialize(array $parameters = array(), $template = null)
    {
        $template = $template ?: 'EWZFormBuilderBundle::initialize.html.twig';

        return $this->render($template, $parameters);
    }

    /**
     * Embeds the form builder GUI.
     *
     * @param FormInterface $form                 The embeded Form (optional)
     * @param Boolean       $allowManualFieldName Whether or not to allow override the field name (optional)
     *
     * @return Response A Response instance
     */
    public function formEmbed(FormInterface $form = null, $allowManualFieldName = false)
    {
        return $this->render('EWZFormBuilderBundle:Form:embed.html.twig', array(
            'form' => $form,
            'allowManualFieldName' => $allowManualFieldName
        ));
    }

    /**
     * Previews a given form.
     *
     * @param FormInterface $form     A FormInterface instance (optional)
     * @param array         $assets   List of assets (field => value) (optional)
     * @param FormView      $formView A FormView instance (optional)
     *
     * @return Response A Response instance
     */
    public function formPreview(FormInterface $form = null, array $assets = array(), FormView $formView = null)
    {
        $fields = $form ? $form->getFields() : array();
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
                        case Field::TYPE_FULLNAME:
                        case Field::TYPE_EMAIL:
                        case Field::TYPE_PHONE:
                        case Field::TYPE_NUMBER:
                        case Field::TYPE_MATRIX:
                        case Field::TYPE_CALCULATION:
                            $fields[$key]->setAttribute('defaultValue', $value);
                            break;

                        case Field::TYPE_DATETIME:
                            if ($value instanceof \DateTime) {
                                $value = array(
                                    'year' => (int) $value->format('Y'),
                                    'month' => (int) $value->format('m'),
                                    'day' => (int) $value->format('d'),
                                    'hour' => (int) $value->format('H'),
                                    'minute' => (int) $value->format('i'),
                                    'ampm' => $value->format('a'),
                                );
                            }
                            $fields[$key]->setAttribute('defaultValue', $value);
                            break;

                        case Field::TYPE_TIME:
                            if ($value instanceof \DateTime) {
                                $value = array(
                                    'hour' => (int) $value->format('H'),
                                    'minute' => (int) $value->format('i'),
                                    'ampm' => $value->format('a'),
                                );
                            }
                            $fields[$key]->setAttribute('defaultValue', $value);
                            break;

                        case Field::TYPE_BIRTHDAY:
                            if ($value instanceof \DateTime) {
                                $value = array(
                                    'year' => (int) $value->format('Y'),
                                    'month' => (int) $value->format('m'),
                                    'day' => (int) $value->format('d'),
                                );
                            }
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
            foreach ($formView->children as $child) {
                foreach ($fields as $key => $field) {
                    if ($child->vars['name'] == $field->getName()) {
                        if ($error = $child->vars['errors']->__toString()) {
                            $fields[$key]->setAttribute('error', $error);
                        }

                        // update special dropdown values
                        switch ($field->getType()) {
                            case Field::TYPE_DROPDOWN:
                                if ($fields[$key]->getAttribute('special.dropdown')) break;

                                $choices = array();

                                foreach ($child->vars['choices'] as $choice) {
                                    $choices[] = sprintf('["%s", "%s"]', $choice->value, $choice->label);
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

        return $this->render('EWZFormBuilderBundle:Form:embed.html.twig', array(
            'formView' => $formView,
            'form'     => $form,
            'fields'   => $fields,
            'preview'  => true,
        ));
    }

    /**
     * @param string $template
     * @param array $parameters
     *
     * @return string
     */
    private function render($template, array $parameters = array())
    {
        if (!isset($this->resources[$template])) {
            $this->resources[$template] = $this->environment->loadTemplate($template);
        }

        return $this->resources[$template]->render($parameters);
    }

    /**
     * {@inheritDoc}
     */
    public function getName()
    {
        return 'ewz_form_builder';
    }
}
