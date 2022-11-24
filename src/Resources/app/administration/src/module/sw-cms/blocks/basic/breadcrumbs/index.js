import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'breadcrumbs',
    label: 'sw-cms.blocks.breadcrumbs.label',
    category: 'basic',
    component: 'sw-cms-block-breadcrumbs',
    previewComponent: 'sw-cms-preview-breadcrumbs',
    defaultConfig: {
        marginBottom: '0',
        marginTop: '0',
        marginLeft: '0',
        marginRight: '0',
        sizingMode: 'boxed'
    },
    slots: {
        'slot': 'breadcrumbs'
    }
});
