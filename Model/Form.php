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
     * List of fields
     *
     * @var array
     */
    protected $fields = array();

    /**
     * Whether or not the form is set as default
     *
     * @var bool
     */
    protected $is_default = true;

    /**
     * @var DateTime
     */
    protected $date_created;

    /**
     * @var DateTime
     */
    protected $last_modified;

    public function __construct()
    {
        $this->date_created  = new DateTime();
        $this->last_modified = new DateTime();
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
     *
     * @return mix
     */
    public function getAttribute($key)
    {
        return isset($this->attributes[$key]) ? $this->attributes[$key] : null;
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
     * Gets the fields belongs to the form.
     *
     * @return array
     */
    public function getFields()
    {
        return $this->fields ?: $this->fields = array();
    }

    /**
     * Gets the id of the fields which belong to the form.
     *
     * @return array
     */
    public function getFieldIds()
    {
        return array_keys($this->getFields());
    }

    /**
     * Indicates whether the form contains a specified field or not.
     *
     * @param integer $id Id of the field
     *
     * @return Boolean
     */
    public function hasField($id)
    {
        return in_array($id, $this->getFieldIds());
    }

    /**
     * Add a field to the form fields.
     *
     * @param integer $id
     * @param array   $values
     */
    public function addField($id, array $values = array())
    {
        if (!$this->hasField($id)) {
            $this->fields[$id] = $values;
        }
    }

    /**
     * Remove a field from the form fields.
     *
     * @param integer $id
     */
    public function removeField($id)
    {
        if (!$this->hasField($id)) {
            unset($this->fields[$id]);
        }
    }

    /**
     * Rest fields list.
     */
    public function resetFields()
    {
        $this->fields = array();
    }

    /**
     * @return Boolean
     */
    public function isDefault()
    {
        return $this->is_default;
    }

    /**
     * @param Boolean
     */
    public function setDefault($isDefault)
    {
        $this->is_default = (bool) $isDefault;
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

    /**
     * @return DateTime
     */
    public function getLastModified()
    {
        return $this->last_modified;
    }

    /**
     * @param DateTime $lastModified
     */
    public function setLastModified(DateTime $lastModified)
    {
        $this->last_modified = $lastModified;
    }
}
