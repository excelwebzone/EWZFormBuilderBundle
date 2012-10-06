<?php

namespace EWZ\Bundle\FormBuilderBundle\Event;

use Symfony\Component\EventDispatcher\Event;

use EWZ\Bundle\FormBuilderBundle\Model\CellInterface;

/**
 * An event that occurs related to a cell.
 */
class CellEvent extends Event
{
    private $cell;

    /**
     * Constructs an event.
     *
     * @param CellInterface $cell
     */
    public function __construct(CellInterface $cell)
    {
        $this->cell = $cell;
    }

    /**
     * Returns the cell for this event.
     *
     * @return CellInterface
     */
    public function getCell()
    {
        return $this->cell;
    }
}
