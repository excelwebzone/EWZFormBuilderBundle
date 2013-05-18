<?php

namespace EWZ\Bundle\FormBuilderBundle\Model;

/**
 * Interface to be implemented by asset managers. This adds an additional level
 * of abstraction between your application, and the actual repository.
 *
 * All changes to assets should happen through this interface.
 */
interface AssetManagerInterface
{
    /**
     * Finds one asset by the given criteria.
     *
     * @param array $criteria
     *
     * @return AssetInterface
     */
    public function findAssetBy(array $criteria);

    /**
     * Finds assets by the given criteria.
     *
     * @param array $criteria
     *
     * @return array of AssetInterface
     */
    public function findAssetsBy(array $criteria);

    /**
     * Creates an empty asset instance.
     *
     * @param FieldInterface $field
     *
     * @return Asset
     */
    public function createAsset(FieldInterface $field);

    /**
     * Saves a asset.
     *
     * @param AssetInterface $asset
     */
    public function saveAsset(AssetInterface $asset);

    /**
     * Checks if the asset was already persisted before, or if it's a new one.
     *
     * @param AssetInterface $asset
     *
     * @return Boolean True, if it's a new asset
     */
    public function isNewAsset(AssetInterface $asset);

    /**
     * Returns the asset fully qualified class name.
     *
     * @return string
     */
    public function getClass();
}
