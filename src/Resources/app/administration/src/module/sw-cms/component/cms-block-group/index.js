import template from './cms-block-group.html.twig';
import './cms-block-group.scss';

import '../../mixin/cms-block-entity-manager';
import '../../mixin/cms-parent-finder';

const { Component, Mixin } = Shopware;

Component.register('cms-block-group', {
    template,

    mixins: [
        Mixin.getByName('cms-state'),
        Mixin.getByName('cms-block-entity-manager'),
        Mixin.getByName('cms-parent-finder')
    ],

    data() {
        return {
            menuPosition: 'right',
            activeAdditionalSettings: false,
            additionalSettings: {}
        }
    },

    created() {
        /**
         * Make sure, that the z-index of the block overlay is smaller than the slider
         * @type {boolean}
         */
        this.$parent.fixBlockOverlayZIndex = true;

        /** Activate additional settings */
        this.block.cmsBlockAdditionaManagement = this.activeAdditionalSettings;

        /** Assign additional settings */
        if (!this.block.customFields) {
            this.block.customFields = this.additionalSettings;
        }
    },

    computed: {
        block() {
            return this.$parent.block;
        },

        customFields() {
            return this.block.customFields;
        }
    },

    methods: {
        /**
         * @param {*} subSection 
         * @returns 
         */
        childBlocks(subSection) {
            if ('' === subSection || null === subSection) {
                return [];
            }

            const currentBlockVueComponent = this.findParent('sw-cms-block', this);
            const currentSectionVueComponent = this.findParent('sw-cms-section', this);

            if (null === currentBlockVueComponent || null === currentSectionVueComponent) {
                return null;
            }

            /**
             * We filter the blocks by the parent id and the sub sections
             */
            const childBlocks = currentSectionVueComponent.section.blocks.filter((block => {
                if (null === block.customFields) {
                    return false;
                }

                return currentBlockVueComponent.block.id === this.fetchCmsParentBlockId(block) &&
                    subSection === block.customFields.cms_sub_section;
            }));

            return childBlocks.sort((a, b) => a.position - b.position);
        },

        /**
         * We try to open the page config tab via section event
         */
        onAddEmptySection() {
            this.onAddSectionBlock();
        },

        onGroupBlockSelection() {
            this.onBlockSelection(this.block);
        },

        /**
         * First, the active block is set. Furthermore, the Block Settings tab is opened via the cms sector
         * @param {*} block 
         */
        onBlockSelection(block) {
            const sectionVueComponent = this.findParent('sw-cms-section', this);
            Shopware.State.dispatch('cmsPageState/setBlock', block);

            if (null !== sectionVueComponent) {
                sectionVueComponent.$emit('page-config-open', 'itemConfig');
            }
        },

        /**
         * We try to open the page config tab via section event
         */
        onAddSectionBlock() {
            const sectionVueComponent = this.findParent('sw-cms-section', this);

            if (null !== sectionVueComponent) {
                sectionVueComponent.$emit('page-config-open', 'blocks');
            }
        },

        /** 
         * Sends prefix of the current viewport
         * prefixes are used for dynamic variables
         * @returns 
         */
        currentViewportPrefix() {
            return this.currentDeviceView === 'mobile' ? 'sm_' : 
                this.currentDeviceView === 'tablet-landscape' ? 'md_' : '';
        },

        /**
         * Returns custom field value
         * @param {*} name 
         * @param {*} responsive 
         * @returns 
         */
        getCFValue(name, responsive = false) {
            return responsive ? this.customFields[this.currentViewportPrefix() + name] : this.customFields[name];
        }
    },

    watch: {
        block: {
            deep: true,
            handler() {}
        }
    }
});
