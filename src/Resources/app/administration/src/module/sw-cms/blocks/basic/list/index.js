import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'list',
    label: 'sw-cms.blocks.list.label',
    category: 'basic',
    component: 'sw-cms-block-list',
    previewComponent: 'sw-cms-preview-list',
    defaultConfig: {
        marginBottom: '0',
        marginTop: '0',
        marginLeft: '0',
        marginRight: '0',
        sizingMode: 'boxed'
    },
    slots: {
        'slot': 'list'
    }
});
