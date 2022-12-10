import template from './sw-cms-block-layout-config.html.twig';
import './sw-cms-block-layout-config.scss';

import './sw-cms-block-layout-default-config';
import './sw-cms-block-layout-background-config';
import './sw-cms-block-layout-style-config';
import './sw-cms-block-layout-box-config';

const { Component } = Shopware;

Component.override('sw-cms-block-layout-config', {
    template
});
