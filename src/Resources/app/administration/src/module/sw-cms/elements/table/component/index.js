import template from './sw-cms-el-table.html.twig';
import './sw-cms-el-table.scss';
 
const { Component, Mixin } = Shopware;

Component.register('sw-cms-el-table', {
    template,

    mixins: [
        Mixin.getByName('cms-element')
    ],

    computed: {
        table() {
            return this.element.config.fields.value;
        },

        caption() {
            return this.element.config.caption.value;
        },
        
        type() {
            return this.element.config.type.value;
        },

        showNumeric() {
            return this.element.config.showNumeric.value;
        },

        striped() {
            return this.element.config.striped.value;
        },

        bordered() {
            return this.element.config.bordered.value;
        },

        hoverEffect() {
            return this.element.config.hoverEffect.value;
        },

        small() {
            return this.element.config.small.value;
        }
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('table');
            this.initElementData('table');
        }
    }
});
