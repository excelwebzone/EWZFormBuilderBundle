<?php

namespace EWZ\Bundle\FormBuilderBundle\Form;

use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Validator\Constraints as Assert;

use EWZ\Bundle\FormBuilderBundle\Model\FormInterface;
use EWZ\Bundle\FormBuilderBundle\Model\Field;

class FormType extends AbstractType
{
    /**
     * ContainerInterface Instance.
     *
     * @var ContainerInterface
     */
    protected $container;

    /**
     * @var FormInterface
     */
    protected $form;

    /**
     * Construct.
     *
     * @param ContainerInterface $container An ContainerInterface instance
     */
    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;

        // create an empty Form instance
        $class = $this->container->getParameter('ewz_form_builder.model.form.class');
        $this->form = new $class();
    }

    /**
     * Assign Form so we can generate the FormType from it.
     *
     * @param FormInterface $form An FormInterface instance
     *
     * @return FormType
     */
    public function setForm(FormInterface $form)
    {
        $this->form = $form;

        return $this;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('form_id', 'hidden', array(
            'data' => $this->form->getId(),
        ));

        if ($this->form->isTableFlag()) {
            $builder->add('row_index', 'hidden');
        }

        foreach ($this->form->getFields() as $field) {
            $multiple = false;
            $expanded = false;

            $required = strtolower($field->getAttribute('required')) == 'yes';

            switch ($field->getType()) {
                case Field::TYPE_HEAD:
                case Field::TYPE_TEXT:
                case Field::TYPE_FORMCOLLAPSE:
                    // do nothing
                    break;

                case Field::TYPE_TEXTBOX:
                case Field::TYPE_FULLNAME:
                case Field::TYPE_PHONE:
                case Field::TYPE_MATRIX:
                    $builder->add($field->getName(), null, array(
                        'label'    => $field->getAttribute('text'),
                        'required' => $required,
                    ));

                    break;

                case Field::TYPE_NUMBER:
                case Field::TYPE_CALCULATION:
                    $builder->add($field->getName(), 'number', array(
                        'label'    => $field->getAttribute('text'),
                        'required' => $required,
                    ));

                    break;

                case Field::TYPE_EMAIL:
                    $builder->add($field->getName(), 'email', array(
                        'label'    => $field->getAttribute('text'),
                        'required' => $required,
                    ));

                    break;

                case Field::TYPE_TEXTAREA:
                    $builder->add($field->getName(), 'textarea', array(
                        'label'    => $field->getAttribute('text'),
                        'required' => $required,
                    ));

                    break;

                case Field::TYPE_DATETIME:
                    $builder->add($field->getName(), $field->getAttribute('allowTime') == 'Yes' ? 'datetime' : 'date', array(
                        'label'    => $field->getAttribute('text'),
                        'required' => $required,
                    ));

                    break;

                case Field::TYPE_TIME:
                    $builder->add($field->getName(), 'time', array(
                        'label'    => $field->getAttribute('text'),
                        'required' => $required,
                    ));

                    break;

                case Field::TYPE_BIRTHDAY:
                    $builder->add($field->getName(), 'birthday', array(
                        'label'    => $field->getAttribute('text'),
                        'required' => $required,
                    ));

                    break;

                case Field::TYPE_CHECKBOX:
                    $multiple = true;

                case Field::TYPE_RADIO:
                    $expanded = true;

                case Field::TYPE_DROPDOWN:
                    $calcValues = array();
                    foreach (explode('|', $field->getAttribute('calcValues')) as $option) {
                        $calcValues[] = $option;
                    }

                    $options = array();
                    foreach (explode('|', $field->getAttribute('options')) as $key => $option) {
                        if (isset($calcValues[$key]) && $calcValues[$key]) {
                            $options[$calcValues[$key]] = $option;
                        } else {
                            $options[$option] = $option;
                        }
                    }

                    $data = $field->getAttribute('selected');
                    if ($multiple) $data = array($data);

                    $builder->add($field->getName(), 'choice', array(
                        'label'    => $field->getAttribute('text'),
                        'data'     => $data,
                        'choices'  => $options,
                        'multiple' => $multiple ?: false,
                        'expanded' => $expanded ?: false,
                        'required' => $required,
                    ));

                    break;
            }
        }
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $options = array(
            'form_id' => null,
        );

        foreach ($this->form->getFields() as $field) {
            $validation = array();

            switch ($field->getType()) {
                case Field::TYPE_HEAD:
                case Field::TYPE_TEXT:
                    break;

                case Field::TYPE_DATETIME:
                case Field::TYPE_TIME:
                case Field::TYPE_BIRTHDAY:
                    $validation[] = new Assert\Date();

                case Field::TYPE_TEXTBOX:
                case Field::TYPE_TEXTAREA:
                case Field::TYPE_DROPDOWN:
                case Field::TYPE_RADIO:
                case Field::TYPE_CHECKBOX:
                case Field::TYPE_FULLNAME:
                case Field::TYPE_EMAIL:
                case Field::TYPE_PHONE:
                case Field::TYPE_NUMBER:
                case Field::TYPE_MATRIX:
                case Field::TYPE_CALCULATION:
                default:
                    $options[$field->getName()] = null;

                    // check is required
                    if (strtolower($field->getAttribute('required')) == 'yes') {
                        $validation[] = new Assert\NotBlank();
                    }

                    // check string validation option
                    switch ($field->getAttribute('validation')) {
                        case 'email': $validation[] = new Assert\Email(); break;
                        case 'alphanumeric': $validation[] = new Assert\Regex(array('pattern' => '/^[\w\d]+/')); break;
                        case 'alphabetic': $validation[] = new Assert\Regex(array('pattern' => '/^\w+/')); break;
                        case 'numeric': $validation[] = new Assert\Type(array('type' => 'numeric')); break;
                    }

                    if ($validation){
                        $options[$field->getName()] = $validation;
                    }
            }
        }

        $resolver->setDefaults(array(
            'validation_constraint' => new Assert\Collection($options)
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'form';
    }
}
