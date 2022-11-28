import template from './sw-cms-link-field.html.twig';
import './sw-cms-link-field.scss';

const { Component } = Shopware;

Component.register('sw-cms-link-field', {
    template,

    props: {
        label: {
            type: String
        },

        type: {
            type: String,
            default: 'link'
        },
        
        link: {
            type: Object,
            default: {
                url: '',
                text: 'Lorem ipsum',
                title: 'Lorem ipsum',
                type: 'primary',
                size: 'md',
                outline: false,
                block: false,
                newTab: false,                        
            }
        },
    },

    computed: {
        linkValue:{
            get() { return this.link; },
            set(value) { this.$emit('update:link', value) }
        }
    }
});
