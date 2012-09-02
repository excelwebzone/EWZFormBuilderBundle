<?php

namespace EWZ\Bundle\FormBuilderBundle\Model;

use Symfony\Component\EventDispatcher\EventDispatcherInterface;

use EWZ\Bundle\FormBuilderBundle\Events;
use EWZ\Bundle\FormBuilderBundle\Event\AssetEvent;

/**
 * Abstract Asset Manager implementation which can be used as base class for your
 * concrete manager.
 */
abstract class AssetManager implements AssetManagerInterface
{
    protected $dispatcher;

    public function __construct(EventDispatcherInterface $dispatcher)
    {
        $this->dispatcher = $dispatcher;
    }

    /**
     * {@inheritDoc}
     */
    public function createAsset(FieldInterface $field)
    {
        $class = $this->getClass();
        $asset = new $class;

        $asset->setField($field);

        $event = new AssetEvent($asset);
        $this->dispatcher->dispatch(Events::ASSET_CREATE, $event);

        return $asset;
    }

    /**
     * {@inheritDoc}
     */
    public function saveAsset(AssetInterface $asset)
    {
        $event = new AssetEvent($asset);
        $this->dispatcher->dispatch(Events::ASSET_PRE_PERSIST, $event);

        $this->doSaveAsset($asset);

        $event = new AssetEvent($asset);
        $this->dispatcher->dispatch(Events::ASSET_POST_PERSIST, $event);
    }

    /**
     * Performs the persistence of the Asset.
     *
     * @abstract
     * @param AssetInterface $asset
     */
    abstract protected function doSaveAsset(AssetInterface $asset);
}
