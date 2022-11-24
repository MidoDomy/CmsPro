import template from './sw-cms-el-button.html.twig';
import './sw-cms-el-button.scss';

import ButtonField from '../../../component/sw-cms-link-field/usage';
 
const { Component, Mixin } = Shopware;

Component.register('sw-cms-el-button', {
    template,

    mixins: [
        Mixin.getByName('cms-element')
    ],

    components: {
        'button-field': ButtonField
    },

    computed: {
        link() {
            return this.element.config.link.value;
        }
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('button');
            this.initElementData('button');
        }
    }
});
