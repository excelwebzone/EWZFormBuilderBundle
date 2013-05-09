<?php

namespace EWZ\Bundle\FormBuilderBundle\Model;

/**
 * Any Asset model must implement this interface.
 */
interface AssetInterface
{
    public function getId();

    public function getField();

    public function setField(FieldInterface $field);

    public function getValue();

    public function setValue($value);
}
