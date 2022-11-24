const ApiService = Shopware.Classes.ApiService;

/**
 * Gateway for the API end point "frw"
 * @class
 * @extends ApiService
 */
class DreiscCmsPluginConfigApiService extends ApiService {
    constructor(httpClient, loginService, apiEndpoint = '') {
        super(httpClient, loginService, apiEndpoint);
    }

    /**
     * @returns {Promise<AxiosResponse<T>>}
     */
    fetchPluginConfig() {
        const headers = this.getBasicHeaders();

        return this.httpClient
            .post(`dreisc.cms.pro/dreisc.cms.base/getPluginConfig`, {
            }, {
                headers
            })
            .then((response) => {
                return ApiService.handleResponse(response);
            });
    }
}

export default DreiscCmsPluginConfigApiService;
