import template from './sw-cms-block-layout-default-config.html.twig';
import './sw-cms-block-layout-default-config.scss';

const { Component, Mixin } = Shopware;

Component.register('sw-cms-block-layout-default-config', {
    template,

    inject: [ 'cmsService' ],

    mixins: [
        Mixin.getByName('cms-state')
    ],

    props: {
        block: {
            type: Object,
            required: true
        }
    },

    computed: {
        /** Sends prefix of the current viewport
         * prefixes are used for dynamic variables
         * example: customFields.[currentViewportPrefix + 'variableName'] */ 
        currentViewportPrefix() {
            return this.currentDeviceView === 'mobile' ? 'sm_' : 
                this.currentDeviceView === 'tablet-landscape' ? 'md_' : '';
        },

        customFields() {
            return this.block.customFields;
        },

        blockWidthOptions() {
            return [
                {'value': 1, 'name': '1/12'},
                {'value': 2, 'name': '2/12'},
                {'value': 3, 'name': '3/12'},
                {'value': 4, 'name': '4/12'},
                {'value': 5, 'name': '5/12'},
                {'value': 6, 'name': '6/12'},
                {'value': 7, 'name': '7/12'},
                {'value': 8, 'name': '8/12'},
                {'value': 9, 'name': '9/12'},
                {'value': 10, 'name': '10/12'},
                {'value': 11, 'name': '11/12'},
                {'value': 12, 'name': '12/12'}
            ];
        }
    }
});
