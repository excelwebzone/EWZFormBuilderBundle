<?php

namespace EWZ\Bundle\FormBuilderBundle\Document;

use EWZ\Bundle\FormBuilderBundle\Model\Cell as AbstractCell;

/**
 * Default ODM CellInterface implementation.
 */
class Cell extends AbstractCell
{
    /**
     * Construct.
     */
    public function __construct()
    {
        parent::__construct();

        $this->attributes = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * @param string $key
     *
     * @return mix
     */
    public function getAttributeElement($key)
    {
        foreach ($this->attributes as $attribute) {
            if ($attribute->getKey() == $key) {
                return $attribute;
            }
        }
        return null;
    }

    /**
     * @param string $key
     * @param string $default
     *
     * @return mix
     */
    public function getAttribute($key, $default = null)
    {
        return ($keyValue = $this->getAttributeElement($key)) ? $keyValue->getValue() : $default;
    }

    /**
     * @return array
     */
    public function getAttributes()
    {
        $attributes = array();

        foreach ($this->attributes as $attribute) {
            $attributes[$attribute->getKey()] = $attribute->getValue();
        }

        return $attributes;
    }

    /**
     * @param array $attributes
     */
    public function setAttributes(array $attributes = array())
    {
        $this->attributes = new \Doctrine\Common\Collections\ArrayCollection();

        foreach ($attributes as $key => $value) {
            $this->attributes->add(new KeyValue($key, $value));
        }
    }

    /**
     * @param string $key
     * @param string $value
     */
    public function setAttribute($key, $value)
    {
        $this->attributes->add(new KeyValue($key, $value));
    }

    /**
     * @param string $key
     */
    public function removeAttribute($key)
    {
        if ($keyValue = $this->getAttributeElement($key)) {
            $this->attributes->removeElement($keyValue);
        }
    }
}
