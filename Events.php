<?php

namespace EWZ\Bundle\FormBuilderBundle;

final class Events
{
    /**
     * The PRE_PERSIST event occurs prior to the persistence backend
     * persisting the Form.
     *
     * This event allows you to modify the data in the Form prior
     * to persisting occurring. The listener receives a
     * EWZ\Bundle\FormBuilderBundle\Event\FormEvent instance.
     *
     * @var string
     */
    const FORM_PRE_PERSIST = 'ewz_form_builder.asset.pre_persist';

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
    const FORM_POST_PERSIST = 'ewz_form_builder.asset.post_persist';

    /**
     * The CREATE event occurs when the manager is asked to create
     * a new instance of a Form.
     *
     * The listener receives a EWZ\Bundle\FormBuilderBundle\Event\FormEvent
     * instance.
     *
     * @var string
     */
    const FORM_CREATE = 'ewz_form_builder.asset.create';

    /**
     * The PRE_PERSIST event occurs prior to the persistence backend
     * persisting the Field.
     *
     * This event allows you to modify the data in the Field prior
     * to persisting occurring. The listener receives a
     * EWZ\Bundle\FieldBuilderBundle\Event\FieldEvent instance.
     *
     * @var string
     */
    const FIELD_PRE_PERSIST = 'ewz_form_builder.asset.pre_persist';

    /**
     * The POST_PERSIST event occurs after the persistence backend
     * persisted the Field.
     *
     * This event allows you to notify users or perform other actions
     * that might require the Field to be persisted before performing
     * those actions. The listener receives a
     * EWZ\Bundle\FieldBuilderBundle\Event\FieldEvent instance.
     *
     * @var string
     */
    const FIELD_POST_PERSIST = 'ewz_form_builder.asset.post_persist';

    /**
     * The CREATE event occurs when the manager is asked to create
     * a new instance of a Field.
     *
     * The listener receives a EWZ\Bundle\FieldBuilderBundle\Event\FieldEvent
     * instance.
     *
     * @var string
     */
    const FIELD_CREATE = 'ewz_form_builder.asset.create';

    /**
     * The PRE_PERSIST event occurs prior to the persistence backend
     * persisting the Cell.
     *
     * This event allows you to modify the data in the Cell prior
     * to persisting occurring. The listener receives a
     * EWZ\Bundle\FormBuilderBundle\Event\CellEvent instance.
     *
     * @var string
     */
    const CELL_PRE_PERSIST = 'ewz_form_builder.asset.pre_persist';

    /**
     * The POST_PERSIST event occurs after the persistence backend
     * persisted the Cell.
     *
     * This event allows you to notify users or perform other actions
     * that might require the Cell to be persisted before performing
     * those actions. The listener receives a
     * EWZ\Bundle\FormBuilderBundle\Event\CellEvent instance.
     *
     * @var string
     */
    const CELL_POST_PERSIST = 'ewz_form_builder.asset.post_persist';

    /**
     * The CREATE event occurs when the manager is asked to create
     * a new instance of a Cell.
     *
     * The listener receives a EWZ\Bundle\FormBuilderBundle\Event\CellEvent
     * instance.
     *
     * @var string
     */
    const CELL_CREATE = 'ewz_form_builder.asset.create';

    /**
     * The PRE_PERSIST event occurs prior to the persistence backend
     * persisting the Asset.
     *
     * This event allows you to modify the data in the Asset prior
     * to persisting occurring. The listener receives a
     * EWZ\Bundle\FormBuilderBundle\Event\AssetEvent instance.
     *
     * @var string
     */
    const ASSET_PRE_PERSIST = 'ewz_form_builder.asset.pre_persist';

    /**
     * The POST_PERSIST event occurs after the persistence backend
     * persisted the Asset.
     *
     * This event allows you to notify users or perform other actions
     * that might require the Asset to be persisted before performing
     * those actions. The listener receives a
     * EWZ\Bundle\FormBuilderBundle\Event\AssetEvent instance.
     *
     * @var string
     */
    const ASSET_POST_PERSIST = 'ewz_form_builder.asset.post_persist';

    /**
     * The CREATE event occurs when the manager is asked to create
     * a new instance of a Asset.
     *
     * The listener receives a EWZ\Bundle\FormBuilderBundle\Event\AssetEvent
     * instance.
     *
     * @var string
     */
    const ASSET_CREATE = 'ewz_form_builder.asset.create';
}
