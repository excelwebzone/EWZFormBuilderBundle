<?php

namespace EWZ\Bundle\FormBuilderBundle\Model;

/**
 * Any Field model must implement this interface.
 */
interface FieldInterface
{
    public function getId();

    public function getName();

    public function setName($name);

    public function getType();

    public function setType($type);

    public function getAttribute($key, $default = null);

    public function setAttribute($key, $value);

    public function removeAttribute($key);

    public function getAttributes();

    public function setAttributes(array $attributes = array());

    public function getDateCreated();

    public function getLastModified();
}
