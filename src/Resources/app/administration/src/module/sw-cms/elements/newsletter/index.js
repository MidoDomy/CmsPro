import './component';
import './preview';
import './config';

Shopware.Service('cmsService').registerCmsElement({
    name: 'newsletter',
    label: 'sw-cms.elements.newsletter.label',
    component: 'sw-cms-el-newsletter',
    previewComponent: 'sw-cms-el-preview-newsletter',
    configComponent: 'sw-cms-el-config-newsletter',
    disabledConfigInfoTextKey: 'sw-cms.elements.sidebarCategoryNavigation.infoText.navigationElement',
});
