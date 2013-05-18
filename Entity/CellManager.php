<?php

namespace EWZ\Bundle\FormBuilderBundle\Entity;

use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Doctrine\ORM\EntityManager;

use EWZ\Bundle\FormBuilderBundle\Model\CellInterface;
use EWZ\Bundle\FormBuilderBundle\Model\CellManager as BaseCellManager;

/**
 * Default ORM CellManager.
 */
class CellManager extends BaseCellManager
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
        $this->em->remove($cell);
        $this->em->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function isNewCell(CellInterface $cell)
    {
        return !$this->em->getUnitOfWork()->isInIdentityMap($cell);
    }

    /**
     * {@inheritDoc}
     */
    protected function doSaveCell(CellInterface $cell)
    {
        $this->em->persist($cell->getForm());
        $this->em->persist($cell->getField());
        $this->em->persist($cell);
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
