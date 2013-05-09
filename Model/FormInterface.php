<?php

namespace EWZ\Bundle\FormBuilderBundle\Model;

/**
 * Any Form model must implement this interface.
 */
interface FormInterface
{
    public function getId();

    public function getName();

    public function setName($name);

    public function getAttribute($key, $default = null);

    public function getAttributes();

    public function setAttributes(array $attributes = array());

    public function getCells();

    public function getFields();

    public function isDefault();

    public function setDefault($isDefault);

    public function getDateCreated();

    public function getLastModified();
}
