import template from './sw-cms-block-accordion.html.twig';
import './sw-cms-block-accordion.scss';

const { Component } = Shopware;

Component.extend('sw-cms-block-accordion', 'sw-cms-block-group-dynamic', {
    template,

    data() {
        return {
            slotItemPrefix: 'Collapse'
        }
    },

    methods: {
        setActiveIndex(index) {
            this.activePanelIndex = index === this.activePanelIndex ? -1 : index;
        }
    }
});
