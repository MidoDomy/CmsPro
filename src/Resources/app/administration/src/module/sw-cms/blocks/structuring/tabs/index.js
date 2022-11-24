import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'tabs',
    label: 'sw-cms.blocks.tabs.label',
    category: 'structuring',
    component: 'sw-cms-block-tabs',
    previewComponent: 'sw-cms-block-preview-tabs',
    defaultConfig: {
        marginBottom: null,
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        sizingMode: 'boxed'
    },
    slots: {}
});
