import template from './sw-cms-block-card.html.twig';
import './sw-cms-block-card.scss';

const { Component } = Shopware;

Component.extend('sw-cms-block-card', 'sw-cms-block-group-predefined', {
    template,

    data() {
        return {
            subSectionNames: [ 'headerContent', 'bodyContent', 'footerContent' ],
            activeAdditionalSettings: true,
            additionalSettings: {
                removeHeaderPadding: false,
                showHeader: true,
                showFooter: true
            }
        }
    },

    computed: {
        removeHeaderPadding() {
            return this.getAdditionalSettingValue('removeHeaderPadding');
        },

        showHeader() {
            return this.getAdditionalSettingValue('showHeader');
        },

        showFooter() {
            return this.getAdditionalSettingValue('showFooter');
        },

        cardHeaderStyles() {
            return {
                padding: this.removeHeaderPadding ? '0px' : ''
            }
        }
    }
});
