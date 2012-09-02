<?php

namespace EWZ\Bundle\FormBuilderBundle\Twig\Extension;

use Symfony\Component\DependencyInjection\ContainerInterface;

class FormBuilderExtension extends \Twig_Extension
{
    /**
     * @var array
     */
    private $resources;

    private $environment;

    /**
     * {@inheritdoc}
     */
    public function getFunctions()
    {
        return array(
            'ewz_form_builder_initialize' => new \Twig_Function_Method($this, 'initialize', array('is_safe' => array('html'))),
        );
    }

    /**
     * {@inheritdoc}
     */
    public function initRuntime(\Twig_Environment $environment)
    {
        $this->environment = $environment;
    }

    /**
     * {@inheritdoc}
     */
    public function initialize(array $parameters = array(), $template = null)
    {
        $template = $template ?: 'EWZFormBuilderBundle::initialize.html.twig';

        return $this->render($template, $parameters);
    }

    /**
     * @param string $template
     * @param array $parameters
     *
     * @return string
     */
    private function render($template, array $parameters = array())
    {
        if (!isset($this->resources[$template])) {
            $this->resources[$template] = $this->environment->loadTemplate($template);
        }

        return $this->resources[$template]->render($parameters);
    }

    /**
     * {@inheritDoc}
     */
    public function getName()
    {
        return 'ewz_form_builder';
    }
}
