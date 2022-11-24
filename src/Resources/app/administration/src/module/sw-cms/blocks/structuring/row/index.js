import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'row',
    label: 'sw-cms.blocks.row.label',
    category: 'structuring',
    component: 'sw-cms-block-row',
    previewComponent: 'sw-cms-block-preview-row',
    defaultConfig: {
        marginBottom: null,
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        sizingMode: 'boxed'
    },
    slots: {}
});
