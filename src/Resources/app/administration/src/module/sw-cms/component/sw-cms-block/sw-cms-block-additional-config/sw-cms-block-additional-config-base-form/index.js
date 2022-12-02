import template from './sw-cms-block-additional-config-base-form.html.twig';

const { Component, Mixin } = Shopware;

Component.register('sw-cms-block-additional-config-base-form', {
    template,
    
    mixins: [
        Mixin.getByName('cms-state'),
    ],

    props: {
        block: {
            type: Object,
            required: true,
        },
    },

    computed: {
        // Checks if the current viewport is desktop
        notResponsive() {
            return this.currentDeviceView != 'desktop';
        },

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
