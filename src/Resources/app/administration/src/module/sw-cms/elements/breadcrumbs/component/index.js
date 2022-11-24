import template from './sw-cms-el-breadcrumbs.html.twig';
import './sw-cms-el-breadcrumbs.scss';

const { Component, Mixin } = Shopware;

Component.register('sw-cms-el-breadcrumbs', {
    template,

    mixins: [
        Mixin.getByName('cms-element'),
        Mixin.getByName('placeholder'),
    ],

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('breadcrumbs');
        },
    },
});
