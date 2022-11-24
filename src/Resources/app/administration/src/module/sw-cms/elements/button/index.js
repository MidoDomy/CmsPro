import './component';
import './preview';
import './config';

Shopware.Service('cmsService').registerCmsElement({
    name: 'button',
    label: 'sw-cms.elements.button.label',
    component: 'sw-cms-el-button',
    previewComponent: 'sw-cms-el-preview-button',
    configComponent: 'sw-cms-el-config-button',
    defaultConfig: {
        link: {
            source: 'static',
            value: {
                url: '',
                category: '',
                isExternal: true,
                text: 'Lorem ipsum',
                title: 'Lorem ipsum',
                style: 'primary',
                size: 'md',
                newTab: false,
            }                        
        }
    }
});
