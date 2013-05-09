<?php

namespace EWZ\Bundle\FormBuilderBundle\Model;

use DateTime;

/**
 * Storage agnostic cell object.
 */
abstract class Cell implements CellInterface
{
    /**
     * Field id
     *
     * @var integer
     */
    protected $id;

    /**
     * Form
     *
     * @var FormInterface
     */
    protected $form;

    /**
     * Field
     *
     * @var FieldInterface
     */
    protected $field;

    /**
     * Custom / additional field attributes
     *
     * @var array
     */
    protected $attributes = array();

    /**
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return FormInterface
     */
    public function getForm()
    {
        return $this->form;
    }

    /**
     * @param FormInterface $form
     */
    public function setForm(FormInterface $form)
    {
        $this->form = $field;
    }

    /**
     * @return FieldInterface
     */
    public function getField()
    {
        return $this->field;
    }

    /**
     * @param FieldInterface $field
     */
    public function setField(FieldInterface $field)
    {
        $this->field = $field;
    }

    /**
     * @param string $key
     * @param string $default
     *
     * @return mix
     */
    public function getAttribute($key, $default = null)
    {
        return isset($this->attributes[$key]) ? $this->attributes[$key] : $default;
    }

    /**
     * @param string $key
     * @param string $value
     */
    public function setAttribute($key, $value)
    {
        $this->attributes[$key] = $value;
    }

    /**
     * @param string $key
     */
    public function removeAttribute($key)
    {
        if (isset($this->attributes[$key])) {
            unset($this->attributes[$key]);
        }
    }

    /**
     * @return array
     */
    public function getAttributes()
    {
        return $this->attributes ?: $this->attributes = array();
    }

    /**
     * @param array $attributes
     */
    public function setAttributes(array $attributes = array())
    {
        $this->attributes = $attributes;
    }

    /**
     * @return DateTime
     */
    public function getDateCreated()
    {
        return $this->date_created;
    }

    /**
     * @param DateTime $dateCreated
     */
    public function setDateCreated(DateTime $dateCreated)
    {
        $this->date_created = $dateCreated;
    }
}
