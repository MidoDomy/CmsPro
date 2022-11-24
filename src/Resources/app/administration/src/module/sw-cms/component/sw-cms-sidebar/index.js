import template from './sw-cms-sidebar.html.twig';

const { Component } = Shopware;

Component.override('sw-cms-sidebar', {
    template,

    data() {
        return {
            currentBlockCategory: 'structuring',
        };
    },

    computed: {
        pageScope() {
            let parentNode = this.$parent;

            // eslint-disable-next-line
            while (parentNode.$options._componentTag !== 'sw-page') {
                parentNode = parentNode.$parent;
            }
            return parentNode;
        },

        hasCmsBlockAdditionalConfig() {
            return typeof this.selectedBlock.cmsBlockAdditionalConfig === 'object' ? true : false;
        },
    },

    methods: {
        onBlockStageDrop(dragData, dropData) {
            if (!dropData || !dragData.block || dropData.dropIndex < 0 || !dropData.section) {
                return;
            }

            if (!dropData.cmsParentBlock || 'object' !== typeof dropData.section.blocks) {
                /** We call the super method and abort, because there is no parent block */
                this.$super('onBlockStageDrop', dragData, dropData);
                return;
            }

            /** Fetch all available block ids before the drop */
            const blockIdsBefore = [];
            dropData.section.blocks.forEach((block) => {
                blockIdsBefore.push(block.id);
            });

            /** Call the super method */
            this.$super('onBlockStageDrop', dragData, dropData);

            /** Fetch all available block ids after the drop */
            const blockIdsAfter = [];
            dropData.section.blocks.forEach((block) => {
                blockIdsAfter.push(block.id);
            });

            /** Fetch the array difference to detect the new block id */
            const blockIdsDiff = blockIdsAfter.filter(blockId => !blockIdsBefore.includes(blockId));

            /** Cancel if no new block has been added */
            if (0 === blockIdsDiff.length) {
                this.$super('onBlockStageDrop', dragData, dropData);
                return;
            }

            /** Fetch the new block entity */
            const newBlockArr = dropData.section.blocks.filter(block => blockIdsDiff[0] === block.id);

            /** Cancel if there is no match for the id */
            if (0 === newBlockArr.length) {
                this.$super('onBlockStageDrop', dragData, dropData);
                return;
            }

            newBlockArr[0].customFields = {
                cms_parent_block_id: dropData.cmsParentBlock.id,
                cms_sub_section: dropData.subSectionName
            }
        },

        onPageConfigOpen(page) {
            this.pageScope.$parent.pageConfigOpen(page);
        },

        onBlockDelete(block, section) {
            if (!section) {
                section = this.page.sections.get(block.sectionId);
            }

            section.blocks.remove(block.id);

            if (this.selectedBlock && this.selectedBlock.id === block.id) {
                Shopware.State.commit('cmsPageState/removeSelectedBlock');
            }

            /** Fetch the child blocks */
            const childBlocks = section.blocks.filter(item => {
                return !!(item.customFields &&
                    item.customFields.cms_parent_block_id &&
                    block.id === item.customFields.cms_parent_block_id);
            });

            if (childBlocks.length > 0) {
                childBlocks.forEach(childBlock => {
                    this.onBlockDelete(childBlock, section);
                })
            }

            this.pageUpdate();
        }
    }
});
