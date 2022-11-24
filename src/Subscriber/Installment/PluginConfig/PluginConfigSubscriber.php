<?php declare(strict_types=1);

namespace CmsPro\Subscriber\Installment\PluginConfig;

use CmsPro\Core\PluginConfig\PluginConfigFetcher;
use Shopware\Core\Framework\DataAbstractionLayer\Exception\InconsistentCriteriaIdsException;
use Shopware\Core\System\SystemConfig\SystemConfigService;
use Shopware\Storefront\Page\Navigation\NavigationPage;
use Shopware\Storefront\Page\Navigation\NavigationPageLoadedEvent;
use Shopware\Storefront\Page\Page;
use Shopware\Storefront\Page\PageLoadedEvent;
use Shopware\Storefront\Page\Product\ProductPage;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class PluginConfigSubscriber implements EventSubscriberInterface
{
    public const DREISC_CMS_PRO_INSTALLMENT_PLUGIN_CONFIG_DATA = 'DREISC_CMS_PRO_INSTALLMENT_PLUGIN_CONFIG_DATA';

    /**
     * @var PluginConfigFetcher
     */
    private $pluginConfigFetcher;

    /**
     * @param PluginConfigFetcher $pluginConfigFetcher
     */
    public function __construct(PluginConfigFetcher $pluginConfigFetcher)
    {
        $this->pluginConfigFetcher = $pluginConfigFetcher;
    }

    public static function getSubscribedEvents()
    {
        return [
            NavigationPageLoadedEvent::class => 'addInstallment'
        ];
    }

    /**
     * @param PageLoadedEvent $event
     * @throws InconsistentCriteriaIdsException
     */
    public function addInstallment(PageLoadedEvent $event)
    {
        /** @var Page|ProductPage|NavigationPage $page */
        $page = $event->getPage();

        $pluginConfig = $this->pluginConfigFetcher->getPluginConfigArray();
        $pluginConfigStruct = new PluginConfigStruct(
            $pluginConfig['googleApiKey'] ?? ''
        );

        $page->addExtension(
            self::DREISC_CMS_PRO_INSTALLMENT_PLUGIN_CONFIG_DATA,
            $pluginConfigStruct
        );
    }
}
