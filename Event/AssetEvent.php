<?php

namespace EWZ\Bundle\FormBuilderBundle\Event;

use Symfony\Component\EventDispatcher\Event;

use EWZ\Bundle\FormBuilderBundle\Model\AssetInterface;

/**
 * An event that occurs related to a asset.
 */
class AssetEvent extends Event
{
    private $asset;

    /**
     * Constructs an event.
     *
     * @param AssetInterface $asset
     */
    public function __construct(AssetInterface $asset)
    {
        $this->asset = $asset;
    }

    /**
     * Returns the asset for this event.
     *
     * @return AssetInterface
     */
    public function getField()
    {
        return $this->asset;
    }
}
