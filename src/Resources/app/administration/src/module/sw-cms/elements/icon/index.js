import './component';
import './preview';
import './config';

Shopware.Service('cmsService').registerCmsElement({
    name: 'icon',
    label: 'sw-cms.elements.icon.label',
    component: 'sw-cms-el-icon',
    previewComponent: 'sw-cms-el-preview-icon',
    configComponent: 'sw-cms-el-config-icon',
    defaultConfig: {
        media: {
            source: 'static',
            value: null,
            required: true,
            entity: {
                name: 'media'
            }
        },
        iconSize: {
            source: 'static',
            value: true,
        },
        text: {
            source: 'static',
            value: '',
        },
        horizontalAlignment: {
            source: 'static',
            value: 'center',
        }
    }
});