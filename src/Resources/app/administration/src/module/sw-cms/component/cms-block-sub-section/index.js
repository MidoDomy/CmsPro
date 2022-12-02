import template from './cms-block-sub-section.html.twig';
import './cms-block-sub-section.scss';

import '../../mixin/cms-parent-finder';

const { Component, Mixin } = Shopware;

Component.register('cms-block-sub-section', {
    template,

    mixins: [
        Mixin.getByName('cms-state'),
        Mixin.getByName('cms-parent-finder')
    ],

    props: {
        childBlocks: {
            type: Object|null,
            required: true
        },

        subSectionName: {
            type: String,
            required: true
        }
    },

    computed: {
        isEmpty() {
            return this.childBlocks.length === 0;
        },

        /**
         * Fetches the last child block and returns the postion + 1
         */
        appendPositionId() {
            return this.childBlocks[this.childBlocks.length - 1].position + 1;
        }
    },

    methods: {
        onAddEmptySection() {
            this.$emit('stage-block-add')
        },

        onBlockSelection(block) {
            this.$emit('block-overlay-click', block)
        },

        onAddSectionBlock(block) {
            this.$emit('stage-block-add', block)
        },

        /**
         * The drop data is processed by the sw-cms-sidebar component in the onBlockStageDrop method.
         * As the parent block, we pass the current block here
         *
         * @param index
         * @returns {{section: null, subSectionName: methods.subSectionName, dropIndex: null}}
         */
        getDropData(index) {
            const sectionVueComponent = this.findParent('sw-cms-section', this);
            const currentBlockVueComponent = this.findParent('sw-cms-block', this);
            let cmsParentBlock = null;

            /** Abort, if sectionVueComponent component is null */
            if (null === sectionVueComponent ) {
                return { dropIndex: null, section: null, subSectionName: this.subSectionName };
            }

            /** Fetch the parent block */
            if (null !== currentBlockVueComponent) {
                cmsParentBlock = currentBlockVueComponent.block;
            }

            return {
                dropIndex: index,
                section: sectionVueComponent.section,
                sectionPosition: 'main',
                subSectionName: this.subSectionName,
                cmsParentBlock: cmsParentBlock
            };
        }
    }
});
