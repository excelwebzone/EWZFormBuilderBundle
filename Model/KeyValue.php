<?php

namespace EWZ\Bundle\FormBuilderBundle\Model;

class KeyValue
{
    /**
     * @var string
     */
    protected $key;

    /**
     * @var string
     */
    protected $value;

    public function __construct($key = null, $value = null)
    {
        $this->key = $key;
        $this->value = $value;
    }

    /**
     * Sets the key.
     *
     * @param string $key.
     *
     * @return self
     */
    public function setKey($key)
    {
        $this->key = $key;

        return $this;
    }

    /**
     * Gets key.
     *
     * @return string
     */
    public function getKey()
    {
        return $this->key;
    }

    /**
     * Sets the value.
     *
     * @param string $value.
     *
     * @return self
     */
    public function setValue($value)
    {
        $this->value = $value;

        return $this;
    }

    /**
     * Gets value.
     *
     * @return string
     */
    public function getValue()
    {
        return $this->value;
    }

    /**
     * @return string
     */
    public function __toString()
    {
        return (string) $this->getKey();
    }
}
