import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'card-horizontal',
    label: 'sw-cms.blocks.cardHorizontal.label',
    category: 'structuring',
    component: 'sw-cms-block-card-horizontal',
    previewComponent: 'sw-cms-block-preview-card-horizontal',
    defaultConfig: {
        marginBottom: null,
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        sizingMode: 'boxed'
    },
    slots: {}
});
