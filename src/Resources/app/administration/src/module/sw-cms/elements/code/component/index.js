import template from './sw-cms-el-code.html.twig';
import './sw-cms-el-code.scss';
 
const { Component, Mixin } = Shopware;

Component.register('sw-cms-el-code', {
    template,

    mixins: [
        Mixin.getByName('cms-element')
    ],

    computed: {
        htmlContent() {
            return this.element.config.htmlContent.value;
        },

        cssContent() {
            return this.element.config.cssContent.value;
        }
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('code');
            this.initElementData('code');
        }
    }
});
