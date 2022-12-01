import template from './sw-cms-block-slider-additional-config.html.twig';

const { Component } = Shopware;

Component.register('sw-cms-block-slider-additional-config', {
    template,

    props: {
        block: {
            type: Object,
            required: true,
        },
    }
});
