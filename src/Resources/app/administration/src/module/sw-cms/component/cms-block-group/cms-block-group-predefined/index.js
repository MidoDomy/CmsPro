const { Component } = Shopware;

Component.extend('sw-cms-block-group-predefined', 'cms-block-group', {
    data() {
        return {
            subSectionNames: [ 'firstContent', 'secondContent' ]
        }
    },

    created() {
        /** Set the availables sub sections for the navigation tree */
        this.block.subSectionNames = this.subSectionNames;
    }
});
