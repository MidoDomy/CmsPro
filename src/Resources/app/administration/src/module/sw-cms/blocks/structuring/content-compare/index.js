import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'content-compare',
    label: 'sw-cms.blocks.contentCompare.label',
    category: 'structuring',
    component: 'sw-cms-block-content-compare',
    previewComponent: 'sw-cms-block-preview-content-compare',
    defaultConfig: {
        marginBottom: null,
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        sizingMode: 'boxed'
    },
    slots: {}
});
