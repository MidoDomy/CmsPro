import './component';
import './preview';
import './config';

Shopware.Service('cmsService').registerCmsElement({
    name: 'code',
    label: 'sw-cms.elements.code.label',
    component: 'sw-cms-el-code',
    previewComponent: 'sw-cms-el-preview-code',
    configComponent: 'sw-cms-el-config-code',
    defaultConfig: {
        htmlContent: {
            source: 'static',
            value: '',
            required: true
        },
        cssContent: {
            source: 'static',
            value: ''
        }
    }
});