<?php

namespace EWZ\Bundle\FormBuilderBundle\Model;

use DateTime;

/**
 * Storage agnostic asset object.
 */
abstract class Asset implements AssetInterface
{
    /**
     * Asset id
     *
     * @var integer
     */
    protected $id;

    /**
     * Asset field
     *
     * @var FieldInterface
     */
    protected $field;

    /**
     * Asset value
     *
     * @var string
     */
    protected $value;

    public function __toString()
    {
        return $this->getValue();
    }

    /**
     * @return integer
     */
    public function getId()
    {
        return $this->id;
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
     * @return string
     */
    public function getValue()
    {
        return $this->value;
    }

    /**
     * @param string $value
     */
    public function setValue($value)
    {
        $this->value = $value;
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
