import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'icon',
    label: 'sw-cms.blocks.icon.label',
    category: 'basic',
    component: 'sw-cms-block-icon',
    previewComponent: 'sw-cms-preview-icon',
    defaultConfig: {
        marginBottom: '0',
        marginTop: '0',
        marginLeft: '0',
        marginRight: '0',
        sizingMode: 'boxed'
    },
    slots: {
        'slot': 'icon'
    }
});
