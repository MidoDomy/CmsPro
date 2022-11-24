import template from './sw-cms-block-card.html.twig';
import './sw-cms-block-card.scss';

const { Component } = Shopware;

Component.extend('sw-cms-block-card', 'sw-cms-block-group-predefined', {
    template,

    data() {
        return {
            subSectionNames: [ 'headerContent', 'bodyContent', 'footerContent' ]
        }
    }
});
