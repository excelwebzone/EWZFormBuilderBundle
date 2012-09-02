<?php

namespace EWZ\Bundle\FormBuilderBundle\Event;

use Symfony\Component\EventDispatcher\Event;

use EWZ\Bundle\FormBuilderBundle\Model\FieldInterface;

/**
 * An event that occurs related to a field.
 */
class FieldEvent extends Event
{
    private $field;

    /**
     * Constructs an event.
     *
     * @param FieldInterface $field
     */
    public function __construct(FieldInterface $field)
    {
        $this->field = $field;
    }

    /**
     * Returns the field for this event.
     *
     * @return FieldInterface
     */
    public function getField()
    {
        return $this->field;
    }
}
