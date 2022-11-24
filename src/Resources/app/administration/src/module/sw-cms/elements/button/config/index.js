import template from './sw-cms-el-config-button.html.twig';
import './sw-cms-el-config-button.scss';

const { Component, Mixin } = Shopware;

Component.register('sw-cms-el-config-button', {
    template,

    mixins: [
        Mixin.getByName('cms-element')
    ],

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('button');
            this.initElementData('button');
        }
    }
});