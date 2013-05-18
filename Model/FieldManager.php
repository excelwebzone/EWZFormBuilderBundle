<?php

namespace EWZ\Bundle\FormBuilderBundle\Model;

use Symfony\Component\EventDispatcher\EventDispatcherInterface;

use EWZ\Bundle\FormBuilderBundle\Events;
use EWZ\Bundle\FormBuilderBundle\Event\FieldEvent;

use InvalidArgumentException;

/**
 * Abstract Field Manager implementation which can be used as base class for your
 * concrete manager.
 */
abstract class FieldManager implements FieldManagerInterface
{
    protected $dispatcher;

    public function __construct(EventDispatcherInterface $dispatcher)
    {
        $this->dispatcher = $dispatcher;
    }

    /**
     * {@inheritDoc}
     */
    public function findFieldById($id)
    {
        return $this->findFieldBy(array('id' => $id));
    }

    /**
     * {@inheritDoc}
     */
    public function createField()
    {
        $class = $this->getClass();
        $field = new $class;

        $event = new FieldEvent($field);
        $this->dispatcher->dispatch(Events::FIELD_CREATE, $event);

        return $field;
    }

    /**
     * {@inheritDoc}
     */
    public function saveField(FieldInterface $field)
    {
        $event = new FieldEvent($field);
        $this->dispatcher->dispatch(Events::FIELD_PRE_PERSIST, $event);

        $this->doSaveField($field);

        $event = new FieldEvent($field);
        $this->dispatcher->dispatch(Events::FIELD_POST_PERSIST, $event);
    }

    /**
     * Performs the persistence of a field.
     *
     * @abstract
     * @param FieldInterface $field
     */
    abstract protected function doSaveField(FieldInterface $field);
}
