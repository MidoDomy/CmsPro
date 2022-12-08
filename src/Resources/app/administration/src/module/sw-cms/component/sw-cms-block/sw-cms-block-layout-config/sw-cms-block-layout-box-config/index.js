import template from './sw-cms-block-layout-box-config.html.twig';
import './sw-cms-block-layout-box-config.scss';

const { Component, Mixin } = Shopware;

Component.register('sw-cms-block-layout-box-config', {
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
        }
    }
});
