import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'breadcrumbs',
    label: 'sw-cms.elements.breadcrumbs.label',
    component: 'sw-cms-el-breadcrumbs',
    configComponent: 'sw-cms-el-config-breadcrumbs',
    previewComponent: 'sw-cms-el-preview-breadcrumbs',
    disabledConfigInfoTextKey: 'sw-cms.elements.sidebarCategoryNavigation.infoText.navigationElement',
});
