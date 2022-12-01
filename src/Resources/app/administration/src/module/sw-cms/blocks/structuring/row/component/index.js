import template from './sw-cms-block-row.html.twig';
import './sw-cms-block-row.scss';

const { Component } = Shopware;

Component.extend('sw-cms-block-row', 'sw-cms-block-group-dynamic', {
    template,

    data() {
        return {
            slotItemPrefix: 'Col'
        }
    },

    created() {
        /** Activate additional settings */
        this.$parent.block.cmsBlockCustomConfig.cmsBlockAdditionaManagement = true;
    }
});
