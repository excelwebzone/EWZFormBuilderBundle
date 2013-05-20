<?php

namespace EWZ\Bundle\FormBuilderBundle\Document;

use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Doctrine\ODM\MongoDB\DocumentManager;

use EWZ\Bundle\FormBuilderBundle\Model\AssetInterface;
use EWZ\Bundle\FormBuilderBundle\Model\AssetManager as BaseAssetManager;

/**
 * Default ODM AssetManager.
 */
class AssetManager extends BaseAssetManager
{
    /**
     * @var DocumentManager
     */
    protected $dm;

    /**
     * @var EntityRepository
     */
    protected $repository;

    /**
     * @var string
     */
    protected $class;

    /**
     * Constructor.
     *
     * @param \Symfony\Component\EventDispatcher\EventDispatcherInterface $dispatcher
     * @param \Doctrine\ODM\MongoDB\DocumentManager                       $dm
     * @param string                                                      $class
     */
    public function __construct(EventDispatcherInterface $dispatcher, DocumentManager $dm, $class)
    {
        parent::__construct($dispatcher);

        $this->dm = $dm;
        $this->repository = $dm->getRepository($class);

        $metadata = $dm->getClassMetadata($class);
        $this->class = $metadata->name;
    }

    /**
     * {@inheritDoc}
     */
    public function findAssetBy(array $criteria)
    {
        return $this->repository->findOneBy($criteria);
    }

    /**
     * {@inheritDoc}
     */
    public function findAssetsBy(array $criteria)
    {
        return $this->repository->findBy($criteria);
    }

    /**
     * {@inheritDoc}
     */
    public function isNewAsset(AssetInterface $asset)
    {
        return !$this->dm->getUnitOfWork()->isInIdentityMap($asset);
    }

    /**
     * {@inheritDoc}
     */
    protected function doSaveAsset(AssetInterface $asset)
    {
        $this->dm->persist($asset->getField());
        $this->dm->persist($asset);
        $this->dm->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getClass()
    {
        return $this->class;
    }
}
