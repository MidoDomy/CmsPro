import template from './sw-cms-block-card-horizontal.html.twig';
import './sw-cms-block-card-horizontal.scss';

const { Component } = Shopware;

Component.extend('sw-cms-block-card-horizontal', 'sw-cms-block-group-predefined', {
    template,

    data() {
        return {
            subSectionNames: [ 'headerContent', 'bodyContent' ],
            activeAdditionalSettings: true,
            additionalSettings: {
                removeLeftColPadding: false,
                leftColMinWidth: 300
            }
        }
    },

    computed: {
        removeLeftColPadding() {
            return this.getCFValue('removeLeftColPadding');
        },

        leftColMinWidth() {
            return this.getCFValue('leftColMinWidth');
        },

        cardLeftColStyles() {
            return {
                minWidth: `${this.leftColMinWidth}px`, 
                padding: this.removeLeftColPadding ? '0px' : ''
            }
        }
    }
});
