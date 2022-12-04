import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'timeline',
    label: 'sw-cms.blocks.timeline.label',
    category: 'structuring',
    component: 'sw-cms-block-timeline',
    previewComponent: 'sw-cms-block-preview-timeline',
    defaultConfig: {
        marginBottom: null,
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        sizingMode: 'boxed'
    },
    slots: {}
});
