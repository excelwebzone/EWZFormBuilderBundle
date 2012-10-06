<?php

namespace EWZ\Bundle\FormBuilderBundle\Model;

/**
 * Interface to be implemented by cell managers. This adds an additional level
 * of abstraction between your application, and the actual repository.
 *
 * All changes to cells should happen through this interface.
 */
interface CellManagerInterface
{
    /**
     * Finds one cell by the given criteria.
     *
     * @param array $criteria
     *
     * @return CellInterface
     */
    public function findCellBy(array $criteria);

    /**
     * Finds cells by the given criteria.
     *
     * @param array $criteria
     *
     * @return array of CellInterface
     */
    public function findCellsBy(array $criteria);

    /**
     * Creates an empty cell instance.
     *
     * @param FieldInterface $field
     * @param FieldInterface $field
     *
     * @return Cell
     */
    public function createCell(FormInterface $form, FieldInterface $field);

    /**
     * Saves a cell.
     *
     * @param CellInterface $cell
     */
    public function saveCell(CellInterface $cell);

    /**
     * Checks if the cell was already persisted before, or if it's a new one.
     *
     * @param CellInterface $cell
     *
     * @return Boolean True, if it's a new cell
     */
    public function isNewCell(CellInterface $cell);

    /**
     * Returns the cell fully qualified class name.
     *
     * @return string
     */
    public function getClass();
}
