import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'alert',
    label: 'sw-cms.blocks.alert.label',
    category: 'basic',
    component: 'sw-cms-block-alert',
    previewComponent: 'sw-cms-preview-alert',
    defaultConfig: {
        marginBottom: '0',
        marginTop: '0',
        marginLeft: '0',
        marginRight: '0',
        sizingMode: 'boxed'
    },
    slots: {
        'slot': 'alert'
    }
});
