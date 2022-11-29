import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'video',
    label: 'sw-cms.elements.video.label',
    component: 'sw-cms-el-video',
    configComponent: 'sw-cms-el-config-video',
    previewComponent: 'sw-cms-el-preview-video',
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
        }
    }
});
