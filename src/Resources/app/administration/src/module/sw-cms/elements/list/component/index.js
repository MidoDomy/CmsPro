import template from './sw-cms-el-list.html.twig';
import './sw-cms-el-list.scss';

import SwCmsHeading from '../../../component/sw-cms-heading-field/usage';
import ListItem from '../../../component/repeater/forms/list-item/usage';

const { Component, Mixin } = Shopware;

Component.register('sw-cms-el-list', {
    template,

    components: {
        'sw-cms-heading': SwCmsHeading,
        'list-item': ListItem
    },

    mixins: [
        Mixin.getByName('cms-element')
    ],

    computed: {
        title() {
            return this.element.config.title.value;
        },

        fields() {
            return this.element.config.fields.value;
        },

        styleType() {
            return this.element.config.styleType.value;
        },

        customSign() {
            return this.element.config.customSign.value;
        },

        size() {
            return this.element.config.size.value;
        },

        listStyles() {
            return { 
                paddingLeft: this.styleType != 'none' ? '20px' : '',
                listStyleType: this.styleType == 'customSign' ? `"${this.customSign}"` : this.styleType
            }
        }
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('list');
            this.initElementData('list');
        }
    }
});
