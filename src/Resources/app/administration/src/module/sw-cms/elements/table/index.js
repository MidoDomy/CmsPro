import './component';
import './preview';
import './config';

Shopware.Service('cmsService').registerCmsElement({
    name: 'table',
    label: 'sw-cms.elements.table.label',
    component: 'sw-cms-el-table',
    previewComponent: 'sw-cms-el-preview-table',
    configComponent: 'sw-cms-el-config-table',
    defaultConfig: {
        fields: {
            source: 'static',
            value: [
                ['Header 1', 'Header 2', 'Header 3'],
                ['Cell 1', 'Cell 2', 'Cell 3'],
                ['Cell 4', 'Cell 5', 'Cell 6']
            ]
        },
        caption: {
            source: 'static',
            value: ""
        },
        type: {
            source: "static",
            value: "default"
        },
        striped: {
            source: "static",
            value: true
        },
        bordered: {
            source: "static",
            value: true
        },
        hoverEffect: {
            source: "static",
            value: true
        },
        small: {
            source: "static",
            value: false
        },
        showNumeric: {
            source: "static",
            value: true
        }
    }
});