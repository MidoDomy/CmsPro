import template from './sw-cms-block-accordion.html.twig';
import './sw-cms-block-accordion.scss';

const { Component } = Shopware;

Component.extend('sw-cms-block-accordion', 'sw-cms-block-group-dynamic', {
    template,

    data() {
        return {
            slotItemPrefix: 'Collapse',
            activeAdditionalSettings: true,
            additionalSettings: {
                activeIndex: 1
            }
        }
    },

    created() {
        this.activePanelIndex = this.getAdditionalSettingValue('activeIndex') <= this.panels.length ? this.getAdditionalSettingValue('activeIndex') - 1 : -1;
    },

    methods: {
        setActiveIndex(index) {
            this.activePanelIndex = index === this.activePanelIndex ? -1 : index;
        }
    }
});
