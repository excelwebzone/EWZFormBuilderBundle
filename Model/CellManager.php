<?php

namespace EWZ\Bundle\FormBuilderBundle\Model;

use Symfony\Component\EventDispatcher\EventDispatcherInterface;

use EWZ\Bundle\FormBuilderBundle\Events;
use EWZ\Bundle\FormBuilderBundle\Event\CellEvent;

/**
 * Abstract Cell Manager implementation which can be used as base class for your
 * concrete manager.
 */
abstract class CellManager implements CellManagerInterface
{
    protected $dispatcher;

    public function __construct(EventDispatcherInterface $dispatcher)
    {
        $this->dispatcher = $dispatcher;
    }

    /**
     * {@inheritDoc}
     */
    public function createCell(FormInterface $form, FieldInterface $field)
    {
        $class = $this->getClass();
        $cell = new $class;

        $cell->setForm($form);
        $cell->setField($field);

        $event = new CellEvent($cell);
        $this->dispatcher->dispatch(Events::CELL_CREATE, $event);

        return $cell;
    }

    /**
     * {@inheritDoc}
     */
    public function saveCell(CellInterface $cell)
    {
        $event = new CellEvent($cell);
        $this->dispatcher->dispatch(Events::CELL_PRE_PERSIST, $event);

        $this->doSaveCell($cell);

        $event = new CellEvent($cell);
        $this->dispatcher->dispatch(Events::CELL_POST_PERSIST, $event);
    }

    /**
     * Performs the persistence of the Cell.
     *
     * @abstract
     * @param CellInterface $cell
     */
    abstract protected function doSaveCell(CellInterface $cell);
}
