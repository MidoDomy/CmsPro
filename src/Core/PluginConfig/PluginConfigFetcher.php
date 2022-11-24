<?php declare(strict_types=1);

namespace CmsPro\Core\PluginConfig;

use Shopware\Core\System\SystemConfig\SystemConfigService;

class PluginConfigFetcher
{
    /**
     * @var SystemConfigService
     */
    private $systemConfigService;

    /**
     * @param SystemConfigService $systemConfigService
     */
    public function __construct(SystemConfigService $systemConfigService)
    {
        $this->systemConfigService = $systemConfigService;
    }

    public function getPluginConfigArray(): array
    {
        $configArray = $this->systemConfigService->get('CmsPro.config') ?? [];

        /** Set the dreischild development key, if no google maps key is set */
        if(empty($configArray['googleApiKey'])) {
            $configArray['googleApiKey'] = 'AIzaSyAHVWDkDPE6o2Uvaf1AQpPDXPfh-PyzUB4';
        }

        return $configArray;
    }
}
