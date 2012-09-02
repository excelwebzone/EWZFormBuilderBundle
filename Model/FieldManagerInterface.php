<?php

namespace EWZ\Bundle\FormBuilderBundle\Model;

/**
 * Interface to be implemented by field managers. This adds an additional level
 * of abstraction between your application, and the actual repository.
 *
 * All changes to fields should happen through this interface.
 */
interface FieldManagerInterface
{
    /**
     * Finds one field by the given id.
     *
     * @param integer $id
     *
     * @return FieldInterface
     */
    public function findFieldById($id);

    /**
     * Finds one field by the given criteria.
     *
     * @param array $criteria
     *
     * @return FieldInterface
     */
    public function findFieldBy(array $criteria);

    /**
     * Finds fields by the given criteria.
     *
     * @param array $criteria
     *
     * @return array of FieldInterface
     */
    public function findFieldsBy(array $criteria);

    /**
     * Creates an empty field instance.
     *
     * @return Field
     */
    public function createField();

    /**
     * Saves a field.
     *
     * @param FieldInterface $field
     */
    public function saveField(FieldInterface $field);

    /**
     * Checks if the field was already persisted before, or if it's a new one.
     *
     * @param FieldInterface $field
     *
     * @return Boolean True, if it's a new field
     */
    public function isNewField(FieldInterface $field);

    /**
     * Returns the field fully qualified class name.
     *
     * @return string
     */
    public function getClass();
}
