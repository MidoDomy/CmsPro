import template from './sw-cms-block-config.html.twig';
import './sw-cms-block-config.scss';

const { Component } = Shopware;

Component.override('sw-cms-block-config', {
    template
});

