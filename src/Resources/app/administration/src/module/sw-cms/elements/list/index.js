import './component';
import './preview';
import './config';

Shopware.Service('cmsService').registerCmsElement({
    name: 'list',
    label: 'sw-cms.elements.list.label',
    component: 'sw-cms-el-list',
    previewComponent: 'sw-cms-el-preview-list',
    configComponent: 'sw-cms-el-config-list',
    defaultConfig: {
        title: {
            source: 'static',
            value: {
                text: 'List title',
                tag: 'h3'
            },
        },
        fields: {
            source: 'static',
            value: [
                {
                    name: "list-item",
                    value: {
                        name: "New item",
                        hasChildren: false,
                        children: []
                    }
                }
            ]
        },
        styleType: {
            source: 'static',
            value: 'disc',
        },
        customSign: {
            source: 'static',
            value: '',
        },
        size: {
            source: 'static',
            value: 'md',
        },
    }
});