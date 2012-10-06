<?php

namespace EWZ\Bundle\FormBuilderBundle\Model;

/**
 * Any Cell model must implement this interface.
 */
interface CellInterface
{
    public function getId();

    public function getForm();

    public function setForm(FormInterface $form);

    public function getField();

    public function setField(FieldInterface $field);

    public function getAttribute($key, $default = null);

    public function setAttribute($key, $value);

    public function removeAttribute($key);

    public function getAttributes();

    public function setAttributes(array $attributes = array());

    public function getDateCreated();
}
