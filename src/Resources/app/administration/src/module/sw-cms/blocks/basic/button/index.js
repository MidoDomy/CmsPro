import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'button',
    label: 'sw-cms.blocks.button.label',
    category: 'basic',
    component: 'sw-cms-block-button',
    previewComponent: 'sw-cms-preview-button',
    defaultConfig: {
        marginBottom: '0',
        marginTop: '0',
        marginLeft: '0',
        marginRight: '0',
        sizingMode: 'boxed'
    },
    slots: {
        'slot': 'button'
    }
});
