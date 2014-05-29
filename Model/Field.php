<?php

namespace EWZ\Bundle\FormBuilderBundle\Model;

use DateTime;

/**
 * Storage agnostic field object.
 */
abstract class Field implements FieldInterface
{
    // form tools
    const TYPE_HEAD     = 'head';
    const TYPE_TEXT     = 'text';
    const TYPE_TEXTBOX  = 'textbox';
    const TYPE_TEXTAREA = 'textarea';
    const TYPE_DROPDOWN = 'dropdown';
    const TYPE_RADIO    = 'radio';
    const TYPE_CHECKBOX = 'checkbox';

    // quick tools
    const TYPE_FULLNAME = 'fullname';
    const TYPE_EMAIL    = 'email';
    const TYPE_PHONE    = 'phone';
    const TYPE_DATETIME = 'datetime';
    const TYPE_TIME     = 'time';
    const TYPE_BIRTHDAY = 'birthday';
    const TYPE_NUMBER   = 'number';

    // power tools
    const TYPE_MATRIX      = 'matrix';
    const TYPE_CALCULATION = 'calculation';

    /**
     * Field id
     *
     * @var integer
     */
    protected $id;

    /**
     * Field name
     *
     * @var string
     */
    protected $name;

    /**
     * Field type
     *
     * @var string
     */
    protected $type;

    /**
     * Field attributes
     *
     * @var array
     */
    protected $attributes;

    /**
     * List of cells
     *
     * @var array
     */
    protected $cells = array();

    /**
     * @var DateTime
     */
    protected $dateCreated;

    /**
     * @var DateTime
     */
    protected $lastModified;

    /**
     * @return string
     */
    public function __toString()
    {
        return $this->getName();
    }

    /**
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @param string $type
     */
    public function setType($type)
    {
        $this->type = $type;
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
     * Gets the form cells.
     *
     * @return array
     */
    public function getCells()
    {
        return $this->cells ?: $this->cells = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Gets the forms.
     *
     * @return array
     */
    public function getForms()
    {
        $forms = array();

        foreach ($this->getCells() as $cell) {
            $forms[] = $cell->getForm();
        }

        return $forms;
    }

    /**
     * @return DateTime
     */
    public function getDateCreated()
    {
        return $this->dateCreated;
    }

    /**
     * @param DateTime $dateCreated
     */
    public function setDateCreated(DateTime $dateCreated)
    {
        $this->dateCreated = $dateCreated;
    }

    /**
     * @return DateTime
     */
    public function getLastModified()
    {
        return $this->lastModified;
    }

    /**
     * @param DateTime $lastModified
     */
    public function setLastModified(DateTime $lastModified)
    {
        $this->lastModified = $lastModified;
    }
}
