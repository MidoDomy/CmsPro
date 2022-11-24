import template from './sw-cms-block-tabs.html.twig';
import './sw-cms-block-tabs.scss';

const { Component } = Shopware;

Component.extend('sw-cms-block-tabs', 'sw-cms-block-group-dynamic', {
    template,

    data() {
        return {
            slotItemPrefix: 'Tab'
        }
    }
});
