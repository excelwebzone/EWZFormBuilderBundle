<?php

namespace EWZ\Bundle\FormBuilderBundle\Document;

use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Doctrine\ODM\MongoDB\DocumentManager;

use EWZ\Bundle\FormBuilderBundle\Model\FormInterface;
use EWZ\Bundle\FormBuilderBundle\Model\FormManager as BaseFormManager;

/**
 * Default ODM FormManager.
 */
class FormManager extends BaseFormManager
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
    public function findFormBy(array $criteria)
    {
        return $this->repository->findOneBy($criteria);
    }

    /**
     * {@inheritDoc}
     */
    public function findFormsBy(array $criteria)
    {
        return $this->repository->findBy($criteria);
    }

    /**
     * {@inheritDoc}
     */
    public function findAllForms()
    {
        return $this->repository->findAll();
    }

    /**
     * {@inheritDoc}
     */
    public function isNewForm(FormInterface $form)
    {
        return !$this->dm->getUnitOfWork()->isInIdentityMap($form);
    }

    /**
     * {@inheritDoc}
     */
    protected function doSaveForm(FormInterface $form)
    {
        $this->dm->persist($form);
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
