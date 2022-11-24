import template from './sw-cms-block-card-horizontal.html.twig';
import './sw-cms-block-card-horizontal.scss';

const { Component } = Shopware;

Component.extend('sw-cms-block-card-horizontal', 'sw-cms-block-group-predefined', {
    template,

    data() {
        return {
            subSectionNames: [ 'headerContent', 'bodyContent' ]
        }
    }
});
