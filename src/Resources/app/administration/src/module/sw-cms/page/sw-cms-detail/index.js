const { Component } = Shopware;
const { cloneDeep } = Shopware.Utils.object;

Component.override('sw-cms-detail', {
    data() {
        return {
            isSectionDuplicate: false,
            oldNewBlockIdMapping: []
        }
    },

    methods: {
        checkRequiredSlotConfigField(slot, block) {
            /** We make sure that the slot config is an object, because our block not always have a config  */
            if (typeof slot.config !== 'object') {
                slot.config = {};
            }

            return this.$super('checkRequiredSlotConfigField', slot, block);
        },

        onSectionDuplicate(section) {
            /** Set the flag for section duplication */
            this.isSectionDuplicate = true;
            this.oldNewBlockIdMapping = [];

            /** SHOPWARE CORE - START */
            const newSection = this.sectionRepository.create();

            const sectionClone = cloneDeep(section);
            sectionClone.id = newSection.id;
            sectionClone.position = section.position + 1;
            sectionClone.pageId = this.page.id;
            sectionClone.blocks = [];

            Object.assign(newSection, sectionClone);

            section.blocks.forEach((block) => {
                this.cloneBlockInSection(block, newSection);
            });

            this.page.sections.splice(newSection.position, 0, newSection);
            this.updateSectionAndBlockPositions();
            /** SHOPWARE CORE - END */

            /** Unset the flag for section duplication */
            this.isSectionDuplicate = false;

            /** Update the old block ids references */
            this.updateOldBlockIdReferences(newSection);
        },

        updateOldBlockIdReferences(section) {
            Object.keys(this.oldNewBlockIdMapping).forEach(key => {
                let oldId = key, newId = this.oldNewBlockIdMapping[key];

                /** Find and replace the ids */
                section.blocks.forEach(block => {
                    if (
                        block.customFields &&
                        block.customFields.cms_parent_block_id &&
                        block.customFields.cms_parent_block_id === oldId
                    ) {
                        block.customFields.cms_parent_block_id = newId;
                    }
                });
            });
        },

        cloneBlockInSection(block, section) {
            this.cmsCloneBlockInSection(block, section, null);
        },

        cmsCloneBlockInSection(block, section, cmsParentBlockId) {
            /** Shopware standard - START */
            const newBlock = this.blockRepository.create();
            const blockClone = cloneDeep(block);

            /** In case of section duplication, we have to track the old and new block ids for later update jobs */
            if (true === this.isSectionDuplicate) {
                this.oldNewBlockIdMapping[blockClone.id] = newBlock.id;
            }

            blockClone.id = newBlock.id;
            blockClone.position = block.position + 1;
            blockClone.sectionId = section.id;
            blockClone.sectionPosition = block.sectionPosition;
            blockClone.slots = [];
            /** Shopware standard - END */

            if (cmsParentBlockId) {
                blockClone.customFields.cms_parent_block_id = cmsParentBlockId;
            }

            /** Fetch the child blocks */
            const childBlocks = section.blocks.filter(item => {
                return !!(item.customFields &&
                    item.customFields.cms_parent_block_id &&
                    block.id === item.customFields.cms_parent_block_id);
            });

            if (childBlocks.length > 0 && true !== this.isSectionDuplicate) {
                childBlocks.forEach(childBlock => {
                    this.cmsCloneBlockInSection(childBlock, section, blockClone.id);
                })
            }

            /** Shopware standard - START */
            Object.assign(newBlock, blockClone);

            this.cloneSlotsInBlock(block, newBlock);

            section.blocks.splice(newBlock.position, 0, newBlock);
            /** Shopware standard - END */
        },

        cloneSlotsInBlock(block, newBlock) {
            /** Shopware standard - START */
            block.slots.forEach((slot) => {
                const element = this.slotRepository.create();
                element.blockId = newBlock.id;
                element.slot = slot.slot;
                element.type = slot.type;
                element.config = cloneDeep(slot.config);
                element.data = cloneDeep(slot.data);

                /** Shopware standard - END */
                /** Make sure that the custom fields of the slot is also adopted */
                if (slot.customFields && slot.customFields != null) {
                    element.customFields = slot.customFields;
                }
                /** Shopware standard - START */

                newBlock.slots.push(element);
            });
            /** Shopware standard - END */
        },

        updateSectionAndBlockPositions() {
            const me = this;
            this.$super('updateSectionAndBlockPositions');

            /** We make sure, that the block editor will be closed after saving or language change */
            const selectedBlockBackup = this.selectedBlock;
            if (this.selectedBlock && 'tabs' === this.selectedBlock.type) {
                this.setSelectedBlock(this.selectedBlockSectionId, null);
                // Shopware.State.dispatch('cmsPageState/setBlock', selectedBlockBackup);
            }
        }
    }
});
