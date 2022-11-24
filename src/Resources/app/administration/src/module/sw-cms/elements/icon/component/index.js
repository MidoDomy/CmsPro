import template from './sw-cms-el-icon.html.twig';
import './sw-cms-el-icon.scss';

const { Component, Mixin } = Shopware;

Component.register('sw-cms-el-icon', {
    template,

    mixins: [
        Mixin.getByName('cms-element')
    ],

    data() {
        return {
            demoValue: ''
        };
    },

    computed: {
        mediaUrl() {
            const context = Shopware.Context.api;
            const elemData = this.element.data.media;
            const mediaSource = this.element.config.media.source;

            if (mediaSource === 'mapped') {
                const demoMedia = this.getDemoValue(this.element.config.media.value);

                if (demoMedia && demoMedia.url) {
                    return demoMedia.url;
                }
            }

            if (elemData && elemData.id) {
                return this.element.data.media.url;
            }

            if (elemData && elemData.url) {
                return `${context.assetsPath}${elemData.url}`;
            }

            return `${context.assetsPath}administration/static/img/cms/preview_mountain_small.jpg`;
        },

        text() {
            return this.element.config.text.value;
        },

        iconSize() {
            return this.element.config.iconSize.value;
        },

        horizontalAlign() {
            return this.element.config.horizontalAlignment.value;
        }
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('icon');
            this.initElementData('icon');
        }
    }
});
