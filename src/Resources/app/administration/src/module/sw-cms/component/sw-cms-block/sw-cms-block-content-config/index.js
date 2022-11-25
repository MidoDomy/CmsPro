import template from './sw-cms-block-content-config.html.twig';
import './sw-cms-block-content-config.scss';

const { Component, Mixin } = Shopware;

Component.register('sw-cms-block-content-config', {
    template,

    inject: [
        'repositoryFactory'
    ],

    mixins: [
        Mixin.getByName('cms-state')
    ],

    props: {
        block: {
            type: Object,
            required: true,
        },
    },

    computed: {
        slotRepository() {
            return this.repositoryFactory.create('cms_slot');
        },

        cmsBlockAdditionalConfig() {
            return this.block.cmsBlockAdditionalConfig;
        },

        panelItems: {
            get() {
                return this.block.slots.sort((itemA, itemB) => {
                    let positionItemA = 0;
                    let positionItemB = 0;

                    if (itemA.customFields && itemA.customFields.cms_panel_position) {
                        positionItemA = itemA.customFields.cms_panel_position
                    } else if (itemA.translated && itemA.translated.customFields && itemA.translated.customFields.cms_panel_position) {
                        positionItemA = itemA.translated.customFields.cms_panel_position
                    }

                    if (itemB.customFields && itemB.customFields.cms_panel_position) {
                        positionItemB = itemB.customFields.cms_panel_position
                    } else if (itemB.translated && itemB.translated.customFields && itemB.translated.customFields.cms_panel_position) {
                        positionItemB = itemB.translated.customFields.cms_panel_position
                    }

                    return positionItemA - positionItemB;
                });
            }
        },

        pageScope() {
            let parentNode = this.$parent;
            // eslint-disable-next-line
            while (parentNode.$options._componentTag !== 'sw-page') {
                parentNode = parentNode.$parent;
            }
            return parentNode;
        }
    },

    methods: {
        movePanelItem(direction, key) {
            const moveSlot = this.block.slots[key];
            let referenceSlot = null

            if (direction === 'up') {
                referenceSlot = this.block.slots[key-1];
            } else {
                referenceSlot = this.block.slots[key+1]
            }

            if (!this.isSystemDefaultLanguage) {
                return;
            }

            if (!moveSlot || !referenceSlot) {
                return;
            }

            /** Switch position */
            const moveSlotPosition = moveSlot.customFields.cms_panel_position;
            moveSlot.customFields.cms_panel_position = parseInt(referenceSlot.customFields.cms_panel_position);
            referenceSlot.customFields.cms_panel_position = parseInt(moveSlotPosition);

        },

        deletePanelItem(key) {
            const deleteSlotScope = this.block.slots[key];

            if (!deleteSlotScope || !this.isSystemDefaultLanguage) {
                return;
            }

            const currentBlockId = this.block.id;
            const deleteSlot = deleteSlotScope.slot;

            const swCmsDetail = this.pageScope.$parent;
            const section = swCmsDetail.page.sections.get(this.block.sectionId);

            /** Delete the sub blocks */
            section.blocks.forEach((block) => {
                if (block.customFields && block.customFields.cms_parent_block_id && block.customFields.cms_sub_section) {
                    if (currentBlockId === block.customFields.cms_parent_block_id && deleteSlot === block.customFields.cms_sub_section) {
                        this.$emit('block-delete', block);
                    }
                }
            });

            /** Remove the slot */
            this.block.slots.remove(deleteSlotScope.id);
        },

        onAddPanel() {
            let slotItemPrefix = this.block.slotItemPrefix;

            const panelNumber = this.block.slots.length + 1;
            let position = 0;

            if (!this.isSystemDefaultLanguage) {
                return;
            }

            this.block.slots.forEach(item => {
                if (item.customFields.cms_panel_position > position) {
                    position = item.customFields.cms_panel_position;
                }
            });

            const element = this.slotRepository.create();
            element.blockId = this.block.id;
            element.slot = this.calculateNextFreeSlotName();
            element.type = 'text';
            element.data = {};
            element.config = {
                content: {
                    source: 'static',
                    value: slotItemPrefix + ' ' + panelNumber
                }
            };
            element.customFields = {
                cms_panel_position: ++position
            }

            this.block.slots.push(element);
        },

        calculateNextFreeSlotName() {
            const usedSlotNames = [];
            let currentId = 1;
            let freeSlotIdSearching = true;

            this.block.slots.forEach(usedSlot => {
                usedSlotNames.push(usedSlot.slot);
            });

            while (freeSlotIdSearching) {
                let tmpSlotName = 'panel' + currentId;

                if (usedSlotNames.includes(tmpSlotName)) {
                    currentId++;
                } else {
                    freeSlotIdSearching = false;
                }
            }

            return 'panel' + currentId;
        }
    },
});
