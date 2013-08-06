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
    const TYPE_EMAIL    = 'email';
    const TYPE_NUMBER   = 'number';
    const TYPE_PHONE    = 'phone';
    const TYPE_BIRTHDAY = 'birthday';

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
