import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'accordion',
    label: 'sw-cms.blocks.accordion.label',
    category: 'structuring',
    component: 'sw-cms-block-accordion',
    previewComponent: 'sw-cms-block-preview-accordion',
    defaultConfig: {
        marginBottom: null,
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        sizingMode: 'boxed'
    },
    slots: {}
});
