import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'video',
    label: 'sw-cms.blocks.video.label',
    category: 'basic',
    component: 'sw-cms-block-video',
    previewComponent: 'sw-cms-preview-video',
    defaultConfig: {
        marginBottom: null,
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        sizingMode: 'boxed'
    },
    slots: {
        'slot': 'video'
    }
});
