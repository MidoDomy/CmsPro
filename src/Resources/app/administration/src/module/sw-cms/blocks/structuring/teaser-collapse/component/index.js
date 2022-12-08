import template from './sw-cms-block-teaser-collapse.html.twig';
import './sw-cms-block-teaser-collapse.scss';

const { Component } = Shopware;

Component.extend('sw-cms-block-teaser-collapse', 'sw-cms-block-group-predefined', {
    template,

    data() {
        return {
            subSectionNames: [ 'mainContent' ],
            activeAdditionalSettings: true,
            additionalSettings: {
                closedHeight: 200,
                md_closedHeight: 200,
                sm_closedHeight: 250
            },

            isOpen: false
        }
    },

    computed: {
        closedHeight() {
            return this.getAdditionalSettingValue('closedHeight', true);
        },

        contentStyles() {
            return {
                height: this.isOpen ? '' : this.closedHeight + 'px'
            }
        }
    }
});
