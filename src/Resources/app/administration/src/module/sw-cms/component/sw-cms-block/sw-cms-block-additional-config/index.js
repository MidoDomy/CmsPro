import template from './sw-cms-block-additional-config.html.twig';
import './sw-cms-block-additional-config.scss';

const { Component, Mixin } = Shopware;

Component.register('sw-cms-block-additional-config', {
    template,

    inject: [
        'repositoryFactory'
    ],

    mixins: [
        Mixin.getByName('cms-state')
    ],

    props: {
        block: {
            type: Object,
            required: true,
        },
    }
});
