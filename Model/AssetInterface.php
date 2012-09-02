<?php

namespace EWZ\Bundle\FormBuilderBundle\Model;

/**
 * Any asset to be used by EWZ\Bundle\FormBuilderBundle must implement this interface.
 */
interface AssetInterface
{
    public function getId();

    public function getField();

    public function setField(FieldInterface $field);

    public function getValue();

    public function setValue($value);

    public function getDateCreated();

    public function getLastModified();
}
