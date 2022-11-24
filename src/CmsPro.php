<?php declare(strict_types=1);

namespace CmsPro;

use Shopware\Core\Framework\Plugin;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\XmlFileLoader;
use Symfony\Component\Config\FileLocator;

class CmsPro extends Plugin
{
    /**
    * @param ContainerBuilder $container
    * @throws \Exception TEST
    */
    public function build(ContainerBuilder $container): void
    {
        parent::build($container);

        $loader = new XmlFileLoader($container, new FileLocator(__DIR__ . '/Resources/config/'));
        $loader->load('dependency.injection.xml');
        $loader->load('services.xml');
    }
}
