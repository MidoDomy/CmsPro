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
            return this.getCFValue('removeHeaderPadding');
        },

        showHeader() {
            return this.getCFValue('showHeader');
        },

        showFooter() {
            return this.getCFValue('showFooter');
        },

        cardHeaderStyles() {
            return {
                padding: this.removeHeaderPadding ? '0px' : ''
            }
        }
    }
});
