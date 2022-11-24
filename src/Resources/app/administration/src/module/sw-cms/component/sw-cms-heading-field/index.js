import template from './sw-cms-heading-field.html.twig';
import './sw-cms-heading-field.scss';

const { Component } = Shopware;

Component.register('sw-cms-heading-field', {
    template,

    props: {
        label: {
            type: String
        },
        
        heading: {
            type: Object,
            default: {
                text: '',
                tag: '',                     
            }
        },
    },

    computed: {
        headingValue:{
            get() { return this.heading; },
            set(value) { this.$emit('update:heading', value) }
        }
    }
});
