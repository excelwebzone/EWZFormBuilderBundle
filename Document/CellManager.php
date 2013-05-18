<?php

namespace EWZ\Bundle\FormBuilderBundle\Document;

use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Doctrine\ORM\EntityManager;

use EWZ\Bundle\FormBuilderBundle\Model\CellInterface;
use EWZ\Bundle\FormBuilderBundle\Model\CellManager as BaseCellManager;

/**
 * Default ODM CellManager.
 */
class CellManager extends BaseCellManager
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
    public function findCellBy(array $criteria)
    {
        return $this->repository->findOneBy($criteria);
    }

    /**
     * {@inheritDoc}
     */
    public function findCellsBy(array $criteria)
    {
        return $this->repository->findBy($criteria);
    }

    /**
     * {@inheritDoc}
     */
    public function deleteCell(CellInterface $cell)
    {
        $this->dm->remove($cell);
        $this->dm->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function isNewAsset(CellInterface $cell)
    {
        return !$this->dm->getUnitOfWork()->isInIdentityMap($cell);
    }

    /**
     * {@inheritDoc}
     */
    protected function doSaveAsset(CellInterface $cell)
    {
        $this->dm->persist($cell->getForm());
        $this->dm->persist($cell->getField());
        $this->dm->persist($cell);
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
