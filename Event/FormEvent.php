<?php

namespace EWZ\Bundle\FormBuilderBundle\Event;

use Symfony\Component\EventDispatcher\Event;

use EWZ\Bundle\FormBuilderBundle\Model\FormInterface;

/**
 * An event that occurs related to a form.
 */
class FormEvent extends Event
{
    private $form;

    /**
     * Constructs an event.
     *
     * @param FormInterface $form
     */
    public function __construct(FormInterface $form)
    {
        $this->form = $form;
    }

    /**
     * Returns the form for this event.
     *
     * @return FormInterface
     */
    public function getForm()
    {
        return $this->form;
    }
}
