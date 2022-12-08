import template from './sw-cms-section.html.twig';

import '../../mixin/cms-block-entity-manager';

const { Component, Mixin } = Shopware;

Component.override('sw-cms-section', {
    template,

    mixins: [
        Mixin.getByName('cms-block-entity-manager')
    ],

    computed: {
        /**
         * We filter out all blocks that have a block parent ID
         * @returns {*}
         */
        sideBarBlocks() {
            return this.$super('sideBarBlocks').filter((block => {
                return null === this.fetchCmsParentBlockId(block);
            }));
        },

        /**
         * We filter out all blocks that have a block parent ID
         * @returns {*}
         */
        mainContentBlocks() {
            return this.$super('mainContentBlocks').filter((block => {
                return null === this.fetchCmsParentBlockId(block);
            }));
        },

        /** Sends prefix of the current viewport
         * prefixes are used for dynamic variables
         * example: customFields.[currentViewportPrefix + 'variableName'] */ 
        currentViewportPrefix() {
            return this.currentDeviceView === 'mobile' ? 'sm_' : 
                this.currentDeviceView === 'tablet-landscape' ? 'md_' : '';
        }
    },

    methods: {
        isBlockFullWidth(block) {
            if (!block.customFields) 
                return true;

            const width = block.customFields[this.currentViewportPrefix + 'width'];

            if (width && width < 12) {
                return false;
            }

            return true;
        }
    }
});
