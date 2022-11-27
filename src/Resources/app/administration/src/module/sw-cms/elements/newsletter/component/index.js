import template from './sw-cms-el-newsletter.html.twig';
import './sw-cms-el-newsletter.scss';

const { Component, Mixin } = Shopware;

Component.register('sw-cms-el-newsletter', {
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
            this.initElementConfig('newsletter');
        },
    },
});
