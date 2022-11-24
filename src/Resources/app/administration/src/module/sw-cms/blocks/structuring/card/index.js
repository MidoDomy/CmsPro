import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'card',
    label: 'sw-cms.blocks.card.label',
    category: 'structuring',
    component: 'sw-cms-block-card',
    previewComponent: 'sw-cms-block-preview-card',
    defaultConfig: {
        marginBottom: null,
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        sizingMode: 'boxed'
    },
    slots: {}
});
