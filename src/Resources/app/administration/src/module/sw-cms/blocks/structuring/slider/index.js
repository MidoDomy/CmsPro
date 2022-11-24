import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'slider',
    label: 'sw-cms.blocks.slider.label',
    category: 'structuring',
    component: 'sw-cms-block-slider',
    previewComponent: 'sw-cms-block-preview-slider',
    defaultConfig: {
        marginBottom: null,
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        sizingMode: 'boxed'
    },
    slots: {}
});
