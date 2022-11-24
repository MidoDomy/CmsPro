import '../../mixin/cms-block-entity-manager';

const { Component, Mixin } = Shopware;

Component.override('sw-cms-section', {
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
        }
    }
});
