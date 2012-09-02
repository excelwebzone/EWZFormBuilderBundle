<?php

namespace EWZ\Bundle\FormBuilderBundle\Document;

use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Doctrine\ODM\MongoDB\DocumentManager;

use EWZ\Bundle\FormBuilderBundle\Model\FieldInterface;
use EWZ\Bundle\FormBuilderBundle\Model\FieldManager as BaseFieldManager;

/**
 * Default ODM FieldManager.
 */
class FieldManager extends BaseFieldManager
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
        return !$this->dm->getUnitOfWork()->isInIdentityMap($field);
    }

    /**
     * {@inheritDoc}
     */
    protected function doSaveField(FieldInterface $field)
    {
        $this->dm->persist($field->getForm());
        $this->dm->persist($field);
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
