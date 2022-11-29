import template from './sw-cms-block-timeline.html.twig';
import './sw-cms-block-timeline.scss';

const { Component } = Shopware;

Component.extend('sw-cms-block-timeline', 'sw-cms-block-group-dynamic', {
    template
});
