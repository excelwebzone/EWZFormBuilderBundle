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

}
