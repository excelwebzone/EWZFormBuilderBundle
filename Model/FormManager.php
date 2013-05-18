<?php

namespace EWZ\Bundle\FormBuilderBundle\Model;

use Symfony\Component\EventDispatcher\EventDispatcherInterface;

use EWZ\Bundle\FormBuilderBundle\Events;
use EWZ\Bundle\FormBuilderBundle\Event\FormEvent;

/**
 * Abstract Form Manager implementation which can be used as base class for your
 * concrete manager.
 */
abstract class FormManager implements FormManagerInterface
{
    protected $dispatcher;

    public function __construct(EventDispatcherInterface $dispatcher)
    {
        $this->dispatcher = $dispatcher;
    }

    /**
     * {@inheritDoc}
     */
    public function findFormById($id)
    {
        return $this->findFormBy(array('id' => $id));
    }

    /**
     * {@inheritDoc}
     */
    public function createForm()
    {
        $class = $this->getClass();
        $form = new $class;

        $event = new FormEvent($form);
        $this->dispatcher->dispatch(Events::FORM_CREATE, $event);

        return $form;
    }

    /**
     * {@inheritDoc}
     */
    public function saveForm(FormInterface $form)
    {
        $event = new FormEvent($form);
        $this->dispatcher->dispatch(Events::FORM_PRE_PERSIST, $event);

        $this->doSaveForm($form);

        $event = new FormEvent($form);
        $this->dispatcher->dispatch(Events::FORM_POST_PERSIST, $event);
    }

    /**
     * Performs the persistence of the Form.
     *
     * @abstract
     * @param FormInterface $form
     */
    abstract protected function doSaveForm(FormInterface $form);
}
