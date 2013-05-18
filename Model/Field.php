<?php

namespace EWZ\Bundle\FormBuilderBundle\Model;

use DateTime;

/**
 * Storage agnostic field object.
 */
abstract class Field implements FieldInterface
{
    const TYPE_HEAD     = 'head';
    const TYPE_TEXT     = 'text';
    const TYPE_TEXTBOX  = 'textbox';
    const TYPE_TEXTAREA = 'textarea';
    const TYPE_DROPDOWN = 'dropdown';
    const TYPE_RADIO    = 'radio';
    const TYPE_CHECKBOX = 'checkbox';

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
    protected $attributes = array();

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
