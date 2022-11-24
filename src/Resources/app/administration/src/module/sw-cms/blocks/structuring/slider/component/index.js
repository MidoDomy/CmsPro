import template from './sw-cms-block-slider.html.twig';
import './sw-cms-block-slider.scss';

const { Component } = Shopware;

Component.extend('sw-cms-block-slider', 'sw-cms-block-group-dynamic', {
    template,

    data() {
        return {
            slotItemPrefix: 'Slide item'
        }
    },

    methods: {
        slidePrev() {
            this.activePanelIndex = this.activePanelIndex == 0 ? this.panels.length - 1 : this.activePanelIndex - 1;
        },

        slideNext() {
            this.activePanelIndex = this.activePanelIndex == this.panels.length - 1 ? 0 : this.activePanelIndex + 1;
        }
    }
});
