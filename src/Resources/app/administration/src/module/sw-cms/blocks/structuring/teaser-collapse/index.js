import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'teaser-collapse',
    label: 'sw-cms.blocks.teaserCollapse.label',
    category: 'structuring',
    component: 'sw-cms-block-teaser-collapse',
    previewComponent: 'sw-cms-block-preview-teaser-collapse',
    defaultConfig: {
        marginBottom: null,
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        sizingMode: 'boxed'
    },
    slots: {}
});
