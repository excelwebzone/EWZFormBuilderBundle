<?php

namespace EWZ\Bundle\FormBuilderBundle\Model;

/**
 * Interface to be implemented by form managers. This adds an additional level
 * of abstraction between your application, and the actual repository.
 *
 * All changes to forms should happen through this interface.
 */
interface FormManagerInterface
{
    /**
     * Finds one form by the given id.
     *
     * @param integer $id
     *
     * @return FormInterface
     */
    public function findFormById($id);

    /**
     * Finds one form by the given criteria.
     *
     * @param array $criteria
     *
     * @return FormInterface
     */
    public function findFormBy(array $criteria);

    /**
     * Finds forms by the given criteria.
     *
     * @param array $criteria
     *
     * @return array of FormInterface
     */
    public function findFormsBy(array $criteria);

    /**
     * Finds all forms.
     *
     * @return array of FormInterface
     */
    public function findAllForms();

    /**
     * Creates an empty form instance.
     *
     * @return Form
     */
    public function createForm();

    /**
     * Saves a form.
     *
     * @param FormInterface $form
     */
    public function saveForm(FormInterface $form);

    /**
     * Checks if the form was already persisted before, or if it's a new one.
     *
     * @param FormInterface $form
     *
     * @return Boolean True, if it's a new form
     */
    public function isNewForm(FormInterface $form);

    /**
     * Returns the form fully qualified class name.
     *
     * @return string
     */
    public function getClass();
}
