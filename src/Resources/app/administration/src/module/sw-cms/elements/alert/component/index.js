import template from './sw-cms-el-alert.html.twig';
import './sw-cms-el-alert.scss';
 
const { Component, Mixin } = Shopware;

Component.register('sw-cms-el-alert', {
    template,

    mixins: [
        Mixin.getByName('cms-element')
    ],

    computed: {
        heading() {
            return this.element.config.heading.value;
        },

        content() {
            return this.element.config.content.value;
        },
        
        type() {
            return this.element.config.type.value;
        },
        
        showIcon() {
            return this.element.config.showIcon.value;
        },
        
        dismissible() {
            return this.element.config.dismissible.value;
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('alert');
            this.initElementData('alert');
        }
    }
});
