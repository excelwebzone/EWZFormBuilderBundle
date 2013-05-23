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
        $this->setKey($key);
        $this->setValue($value);
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
        $this->value = is_array($value) ? serialize($value) : $value;

        return $this;
    }

    /**
     * Gets value.
     *
     * @return string
     */
    public function getValue()
    {
        try {
            return $this->value ? unserialize($this->value) : null;
        }
        catch (\Exception $e) {
            return $this->value;
        }
    }

    /**
     * @return string
     */
    public function __toString()
    {
        return (string) $this->getKey();
    }
}
