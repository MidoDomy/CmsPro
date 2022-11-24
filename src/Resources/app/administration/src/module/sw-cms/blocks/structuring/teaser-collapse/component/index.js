import template from './sw-cms-block-teaser-collapse.html.twig';
import './sw-cms-block-teaser-collapse.scss';

const { Component } = Shopware;

Component.extend('sw-cms-block-teaser-collapse', 'sw-cms-block-group-predefined', {
    template,

    data() {
        return {
            subSectionNames: [ 'mainContent' ],

            isOpen: false
        }
    },
});
