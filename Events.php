<?php

namespace EWZ\Bundle\FormBuilderBundle;

final class Events
{
    /**
     * The PRE_PERSIST event occurs prior to the persistence backend
     * persisting the Field.
     *
     * This event allows you to modify the data in the Field prior
     * to persisting occuring. The listener receives a
     * EWZ\Bundle\FormBuilderBundle\Event\FieldPersistEvent instance.
     *
     * Persisting of the field can be aborted by calling
     * $event->abortPersist()
     *
     * @var string
     */
    const FIELD_PRE_PERSIST = 'ewz_form_builder.field.pre_persist';

    /**
     * The POST_PERSIST event occurs after the persistence backend
     * persisted the Field.
     *
     * This event allows you to notify users or perform other actions
     * that might require the Field to be persisted before performing
     * those actions. The listener receives a
     * EWZ\Bundle\FormBuilderBundle\Event\FieldEvent instance.
     *
     * @var string
     */
    const FIELD_POST_PERSIST = 'ewz_form_builder.field.post_persist';

    /**
     * The CREATE event occurs when the manager is asked to create
     * a new instance of a Field.
     *
     * The listener receives a EWZ\Bundle\FormBuilderBundle\Event\FieldEvent
     * instance.
     *
     * @var string
     */
    const FIELD_CREATE = 'ewz_form_builder.field.create';

    /**
     * The PRE_PERSIST event occurs prior to the persistence backend
     * persisting the Form.
     *
     * This event allows you to modify the data in the Form prior
     * to persisting occuring. The listener receives a
     * EWZ\Bundle\FormBuilderBundle\Event\FormEvent instance.
     *
     * @var string
     */
    const FORM_PRE_PERSIST = 'ewz_form_builder.form.pre_persist';

    /**
     * The POST_PERSIST event occurs after the persistence backend
     * persisted the Form.
     *
     * This event allows you to notify users or perform other actions
     * that might require the Form to be persisted before performing
     * those actions. The listener receives a
     * EWZ\Bundle\FormBuilderBundle\Event\FormEvent instance.
     *
     * @var string
     */
    const FORM_POST_PERSIST = 'ewz_form_builder.form.post_persist';

    /**
     * The CREATE event occurs when the manager is asked to create
     * a new instance of a Form.
     *
     * The listener receives a EWZ\Bundle\FormBuilderBundle\Event\FormEvent
     * instance.
     *
     * @var string
     */
    const FORM_CREATE = 'ewz_form_builder.form.create';
}
