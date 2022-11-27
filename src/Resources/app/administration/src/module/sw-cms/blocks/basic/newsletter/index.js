import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'newsletter',
    label: 'sw-cms.blocks.newsletter.label',
    category: 'basic',
    component: 'sw-cms-block-newsletter',
    previewComponent: 'sw-cms-preview-newsletter',
    defaultConfig: {
        marginBottom: '0',
        marginTop: '0',
        marginLeft: '0',
        marginRight: '0',
        sizingMode: 'boxed'
    },
    slots: {
        'slot': 'newsletter'
    }
});
