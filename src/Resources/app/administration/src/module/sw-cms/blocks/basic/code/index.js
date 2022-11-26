import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'code',
    label: 'sw-cms.blocks.code.label',
    category: 'basic',
    component: 'sw-cms-block-code',
    previewComponent: 'sw-cms-preview-code',
    defaultConfig: {
        marginBottom: '0',
        marginTop: '0',
        marginLeft: '0',
        marginRight: '0',
        sizingMode: 'boxed'
    },
    slots: {
        'slot': 'code'
    }
});
