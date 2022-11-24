import template from './sw-cms-el-config-alert.html.twig';
import './sw-cms-el-config-alert.scss';

const { Component, Mixin } = Shopware;

Component.register('sw-cms-el-config-alert', {
    template,

    mixins: [
        Mixin.getByName('cms-element')
    ],

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