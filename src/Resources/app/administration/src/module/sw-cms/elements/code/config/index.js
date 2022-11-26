import template from './sw-cms-el-config-code.html.twig';
import './sw-cms-el-config-code.scss';

const { Component, Mixin } = Shopware;

Component.register('sw-cms-el-config-code', {
    template,

    mixins: [
        Mixin.getByName('cms-element')
    ],

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