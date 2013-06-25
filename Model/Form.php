<?php

namespace EWZ\Bundle\FormBuilderBundle\Model;

use DateTime;

/**
 * Storage agnostic form object.
 */
abstract class Form implements FormInterface
{
    /**
     * Form id.
     *
     * @var integer
     */
    protected $id;

    /**
     * Form name
     *
     * @var string
     */
    protected $name;

    /**
     * Form attributes
     *
     * @var array
     */
    protected $attributes = array();

    /**
     * List of cells
     *
     * @var array
     */
    protected $cells = array();

    /**
     * Whether or not the form is set as default
     *
     * @var bool
     */
    protected $default = true;

    /**
     * @var DateTime
     */
    protected $dateCreated;

    /**
     * @var DateTime
     */
    protected $lastModified;

    public function __construct()
    {
        $this->dateCreated  = new DateTime();
        $this->lastModified = new DateTime();
    }

    public function __toString()
    {
        return $this->getName();
    }

    /**
     * @return ineteger
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
     * Gets the form fields (merge field attributers with cell's).
     *
     * @return array
     */
    public function getFields()
    {
        $fields = array();

        foreach ($this->getCells() as $cell) {
            $field = $cell->getField();

            foreach ($cell->getAttributes() as $key => $value) {
                $field->setAttribute($key, $value);
            }

            $fields[] = $field;
        }

        return $fields;
    }

    /**
     * @return Boolean
     */
    public function isDefault()
    {
        return $this->default;
    }

    /**
     * @param Boolean
     */
    public function setDefault($default)
    {
        $this->default = (Boolean) $default;
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
