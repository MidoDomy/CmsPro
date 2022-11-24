import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'table',
    label: 'sw-cms.blocks.table.label',
    category: 'basic',
    component: 'sw-cms-block-table',
    previewComponent: 'sw-cms-preview-table',
    defaultConfig: {
        marginBottom: '0',
        marginTop: '0',
        marginLeft: '0',
        marginRight: '0',
        sizingMode: 'boxed'
    },
    slots: {
        'slot': 'table'
    }
});
