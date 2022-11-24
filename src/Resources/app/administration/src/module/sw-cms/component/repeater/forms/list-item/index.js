import template from './list-item.html.twig';
import './list-item.scss';

const { Component } = Shopware;

Component.register('list-item', {
    template,

    props: {
        defaultValue: {
            type: Object,
            required: true
        },
        value: {
            type: Object,
            required: true
        },
        index: {
            type: Number
        }
    },

    computed: {
        item: {
          get () { return this.value },
          set (item) { this.$emit('input', item) }
        }
    }
});
