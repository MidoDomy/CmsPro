import template from './sw-cms-el-config-list.html.twig';
import './sw-cms-el-config-list.scss';

const { Component, Mixin } = Shopware;

Component.register('sw-cms-el-config-list', {
    template,

    mixins: [
        Mixin.getByName('cms-element')
    ],

    created() {
        this.createdComponent();
    },

    data() {
        return {
            // default values added to the newly added item
            defaultValue: {
                name: "New item",
                hasChildren: false,
                children: []
            }
        }
    },

    methods: {
        createdComponent() {
            this.initElementConfig('list');
            this.initElementData('list');
        }
    }
});