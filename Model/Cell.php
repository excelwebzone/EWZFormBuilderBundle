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
     * @var DateTime
     */
    protected $date_created;

    public function __construct()
    {
        $this->date_created  = new DateTime();
    }

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
        return $this->getAttributes()->containsKey($key) ? $this->getAttributes()->get($key) : $default;
    }

    /**
     * @param string $key
     * @param string $value
     */
    public function setAttribute($key, $value)
    {
        $this->getAttributes()->set($key, $value);
    }

    /**
     * @param string $key
     */
    public function removeAttribute($key)
    {
        $this->getAttributes()->remove($key);
    }

    /**
     * @return array
     */
    public function getAttributes()
    {
        return $this->attributes ?: $this->attributes = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * @param array $attributes
     */
    public function setAttributes(array $attributes = array())
    {
        $this->getAttributes()->clear();

        foreach ($attributes as $key => $value) {
            $this->getAttributes()->set($key, $value);
        }
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
