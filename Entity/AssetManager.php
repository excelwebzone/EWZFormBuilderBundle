<?php

namespace EWZ\Bundle\FormBuilderBundle\Entity;

use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Doctrine\ORM\EntityManager;

use EWZ\Bundle\FormBuilderBundle\Model\AssetInterface;
use EWZ\Bundle\FormBuilderBundle\Model\AssetManager as BaseAssetManager;

/**
 * Default ORM AssetManager.
 */
class AssetManager extends BaseAssetManager
{
    /**
     * @var EntityManager
     */
    protected $em;

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
     * @param \Doctrine\ORM\EntityManager                                 $em
     * @param string                                                      $class
     */
    public function __construct(EventDispatcherInterface $dispatcher, EntityManager $em, $class)
    {
        parent::__construct($dispatcher);

        $this->em = $em;
        $this->repository = $em->getRepository($class);

        $metadata = $em->getClassMetadata($class);
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
        return !$this->em->getUnitOfWork()->isInIdentityMap($asset);
    }

    /**
     * {@inheritDoc}
     */
    protected function doSaveAsset(AssetInterface $asset)
    {
        $this->em->persist($asset->getField());
        $this->em->persist($asset);
        $this->em->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getClass()
    {
        return $this->class;
    }
}
