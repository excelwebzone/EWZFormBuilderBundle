<?php

namespace EWZ\Bundle\FormBuilderBundle\Entity;

use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Doctrine\ORM\EntityManager;

use EWZ\Bundle\FormBuilderBundle\Model\FieldInterface;
use EWZ\Bundle\FormBuilderBundle\Model\FieldManager as BaseFieldManager;

/**
 * Default ORM FieldManager.
 */
class FieldManager extends BaseFieldManager
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
    public function findFieldBy(array $criteria)
    {
        return $this->repository->findOneBy($criteria);
    }

    /**
     * {@inheritDoc}
     */
    public function findFieldsBy(array $criteria)
    {
        return $this->repository->findBy($criteria);
    }

    /**
     * {@inheritDoc}
     */
    public function isNewField(FieldInterface $field)
    {
        return !$this->em->getUnitOfWork()->isInIdentityMap($field);
    }

    /**
     * {@inheritDoc}
     */
    protected function doSaveField(FieldInterface $field)
    {
        $this->em->persist($field);
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
