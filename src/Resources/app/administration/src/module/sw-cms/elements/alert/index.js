import './component';
import './preview';
import './config';

Shopware.Service('cmsService').registerCmsElement({
    name: 'alert',
    label: 'sw-cms.elements.alert.label',
    component: 'sw-cms-el-alert',
    previewComponent: 'sw-cms-el-preview-alert',
    configComponent: 'sw-cms-el-config-alert',
    defaultConfig: {
        content: {
            source: 'static',
            value: 'Lorem ipsum dolor sit amet!',
            required: true
        },
        heading: {
            source: 'static',
            value: ''
        },
        type: {
            source: 'static',
            value: 'info'
        },
        dismissible: {
            source: 'static',
            value: false
        },
        showIcon: {
            source: 'static',
            value: true
        },
    }
});