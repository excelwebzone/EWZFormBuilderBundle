<?php

namespace EWZ\Bundle\FormBuilderBundle\DependencyInjection;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;
use Symfony\Component\DependencyInjection\Loader;

/**
 * This is the class that loads and manages your bundle configuration
 *
 * To learn more see {@link http://symfony.com/doc/current/cookbook/bundles/extension.html}
 */
class EWZFormBuilderExtension extends Extension
{
    /**
     * {@inheritDoc}
     */
    public function load(array $configs, ContainerBuilder $container)
    {
        $configuration = new Configuration();
        $config = $this->processConfiguration($configuration, $configs);

        $loader = new Loader\XmlFileLoader($container, new FileLocator(__DIR__.'/../Resources/config'));
        $loader->load('twig.xml');
        $loader->load('form.xml');

        if (!in_array(strtolower($config['db_driver']), array('mongodb', 'orm'))) {
            throw new \InvalidArgumentException(sprintf('Invalid db driver "%s".', $config['db_driver']));
        }
        $loader->load(sprintf('%s.xml', $config['db_driver']));

        $container->setParameter('ewz_form_builder.model_manager_name', $config['model_manager_name']);

        // handle the MongoDB document manager name in a specific way as it does not have a registry to make it easy
        if ('mongodb' === $config['db_driver']) {
            if (null === $config['model_manager_name']) {
                $container->setAlias('ewz_form_builder.document_manager', new Alias('doctrine.odm.mongodb.document_manager', false));
            } else {
                $container->setAlias('ewz_form_builder.document_manager', new Alias(sprintf('doctrine.odm.%s_mongodb.document_manager', $config['model_manager_name']), false));
            }
        }

        $container->setParameter('ewz_form_builder.model.form.class', $config['class']['model']['form']);
        $container->setParameter('ewz_form_builder.model.field.class', $config['class']['model']['field']);
        $container->setParameter('ewz_form_builder.model.asset.class', $config['class']['model']['asset']);

        $container->setParameter('ewz_form_builder.form.form_type.class', $config['class']['form']['form_type']);

        $container->setAlias('ewz_form_builder.manager.form', $config['service']['manager']['form']);
        $container->setAlias('ewz_form_builder.manager.field', $config['service']['manager']['field']);
        $container->setAlias('ewz_form_builder.manager.asset', $config['service']['manager']['asset']);
    }
}
