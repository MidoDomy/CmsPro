const { Mixin } = Shopware;

Mixin.register('cms-block-entity-manager', {
    methods: {
        /**
         * Returns the block parent id if it exists. Otherwise, null will returned.
         *
         * @param block Entity object
         * @returns {null|*}
         */
        fetchCmsParentBlockId(block) {
            if (block && block.customFields !== null && 'object' === typeof block.customFields) {
                if (typeof block.customFields.cms_parent_block_id === 'string') {
                    if (block.customFields.cms_parent_block_id.length === 32) {
                        return block.customFields.cms_parent_block_id;
                    }
                }
            }

            return null;
        }
    }
});
