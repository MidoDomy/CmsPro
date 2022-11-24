import DreiscCmsPluginConfigApiService from "./api/dreisc.cms.plugin.config.api.service";

const { Application } = Shopware;

Application.addServiceProvider('dreiscCmsPluginConfigApiService', (container) => {
    const initContainer = Application.getContainer('init');

    return new DreiscCmsPluginConfigApiService(initContainer.httpClient, container.loginService);
});
