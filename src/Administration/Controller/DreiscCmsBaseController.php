<?php declare(strict_types=1);

namespace CmsPro\Administration\Controller;

use CmsPro\Core\PluginConfig\PluginConfigFetcher;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Shopware\Core\Framework\Routing\Annotation\RouteScope;

class DreiscCmsBaseController extends AbstractController
{
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

    /**
     * @RouteScope(scopes={"api"})
     * @Route("/api/dreisc.cms.pro/dreisc.cms.base/getPluginConfig", defaults={"auth_required"=true})
     */
    public function getPluginConfig(): JsonResponse
    {
        return new JsonResponse(
            $this->pluginConfigFetcher->getPluginConfigArray()
        );
    }
}
