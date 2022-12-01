import template from './sw-cms-block-row-additional-config.html.twig';

const { Component } = Shopware;

Component.register('sw-cms-block-row-additional-config', {
    template,

    props: {
        block: {
            type: Object,
            required: true,
        },
    }
});
