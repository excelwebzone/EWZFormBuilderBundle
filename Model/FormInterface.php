<?php

namespace EWZ\Bundle\FormBuilderBundle\Model;

/**
 * Binds a fields to form, using a unique, arbitrary id.
 */
interface FormInterface
{
    public function getId();

    public function getName();

    public function setName($name);

    public function getAttribute($key);

    public function getAttributes();

    public function setAttributes(array $attributes = array());

    public function getFields();

    public function isDefault();

    public function setDefault($isDefault);

    public function getDateCreated();

    public function getLastModified();
}
