import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'audio',
    label: 'sw-cms.elements.audio.label',
    component: 'sw-cms-el-audio',
    configComponent: 'sw-cms-el-config-audio',
    previewComponent: 'sw-cms-el-preview-audio',
    defaultConfig: {
        media: {
            source: 'static',
            value: null,
            required: true,
            entity: {
                name: 'media'
            }
        },
        previewMedia: {
            source: 'static',
            required: true,
            value: null,
            entity: {
                name: 'media'
            }
        },
        title: {
            source: 'static',
            value: '',
        },
        author: {
            source: 'static',
            value: '',
        },
    }
});
