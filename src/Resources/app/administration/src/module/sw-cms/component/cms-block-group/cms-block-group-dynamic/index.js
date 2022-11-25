const { Component } = Shopware;

Component.extend('sw-cms-block-group-dynamic', 'cms-block-group', {
    inject: [
        'repositoryFactory'
    ],

    data() {
        return {
            activePanelIndex: 0,
            slotItemPrefix: 'Panel'
        }
    },

    created() {
        /** Activate slot items settings */
        this.$parent.block.cmsBlockAdditionalConfig = {
            cmsBlockDynamicSlotItemsManagement: true
        };
        this.$parent.block.slotItemPrefix = this.slotItemPrefix;
    },

    computed: {
        slotRepository() {
            return this.repositoryFactory.create('cms_slot');
        },

        panels() {
            const panels = [];

            if(0 === this.$parent.block.slots.length) {
                this.addInitialPanel();
            }

            this.$parent.block.slots.forEach(item => {
                let position = 0;

                if (item.customFields && item.customFields.cms_panel_position) {
                    position = item.customFields.cms_panel_position
                } else if (item.translated && item.translated.customFields && item.translated.customFields.cms_panel_position) {
                    position = item.translated.customFields.cms_panel_position
                }

                panels.push({
                    key: item.slot,
                    position: position,
                    headline: item.config.content.value
                });
            });

            /** Sortieren */
            panels.sort((panelA, panelB) => {
                return panelA.position - panelB.position;
            });

            /** Set the available sub sections for the navigation tree */
            const panelKeys = [];
            const subSectionNamesAlias = [];
            panels.forEach(panel => {
                panelKeys.push(panel.key);
                subSectionNamesAlias[panel.key] = panel.headline;
            });

            this.$parent.block.subSectionNames = panelKeys;
            this.$parent.block.subSectionNamesAlias = subSectionNamesAlias;

            return panels;
        }
    },

    methods: {
        addInitialPanel() {
            const element = this.slotRepository.create();
            element.blockId = this.$parent.block.id;
            element.slot = 'panel0';
            element.type = 'text';
            element.data = {};
            element.config = {
                content: {
                    source: 'static',
                    value: `${this.slotItemPrefix} 1`
                }
            };
            element.customFields = {
                cms_panel_position: 1
            }

            this.$parent.block.slots.push(element);
        }
    }
});
