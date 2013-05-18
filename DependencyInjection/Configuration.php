<?php

namespace EWZ\Bundle\FormBuilderBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

/**
 * This is the class that validates and merges configuration from your app/config files
 *
 * To learn more see {@link http://symfony.com/doc/current/cookbook/bundles/extension.html#cookbook-bundles-extension-config-class}
 */
class Configuration implements ConfigurationInterface
{
    /**
     * {@inheritDoc}
     */
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $rootNode = $treeBuilder->root('ewz_form_builder');

        $rootNode
            ->children()
                ->scalarNode('db_driver')->cannotBeOverwritten()->isRequired()->end()
                ->scalarNode('model_manager_name')->defaultNull()->end()

                ->arrayNode('class')->isRequired()
                    ->children()
                        ->arrayNode('model')->isRequired()
                            ->children()
                                ->scalarNode('form')->isRequired()->end()
                                ->scalarNode('field')->isRequired()->end()
                                ->scalarNode('cell')->isRequired()->end()
                                ->scalarNode('asset')->isRequired()->end()
                            ->end()
                        ->end()
                        ->arrayNode('form')->isRequired()
                            ->children()
                                ->scalarNode('form_type')->isRequired()->end()
                            ->end()
                        ->end()
                    ->end()
                ->end()

                ->arrayNode('service')->addDefaultsIfNotSet()
                    ->children()
                        ->arrayNode('manager')->addDefaultsIfNotSet()
                            ->children()
                                ->scalarNode('form')->cannotBeEmpty()->defaultValue('ewz_form_builder.manager.form.default')->end()
                                ->scalarNode('field')->cannotBeEmpty()->defaultValue('ewz_form_builder.manager.field.default')->end()
                                ->scalarNode('cell')->cannotBeEmpty()->defaultValue('ewz_form_builder.manager.cell.default')->end()
                                ->scalarNode('asset')->cannotBeEmpty()->defaultValue('ewz_form_builder.manager.asset.default')->end()
                            ->end()
                        ->end()
                    ->end()
                ->end()
            ->end()
        ;

        return $treeBuilder;
    }
}
