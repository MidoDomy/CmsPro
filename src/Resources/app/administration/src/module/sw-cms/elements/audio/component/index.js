import template from './sw-cms-el-audio.html.twig';
import './sw-cms-el-audio.scss';

const { Component, Mixin } = Shopware;

Component.register('sw-cms-el-audio', {
    template,

    mixins: [
        Mixin.getByName('cms-element')
    ],

    inject: [
        'repositoryFactory',
    ],

    data() {
        return {
            editable: true,
            demoValue: '',
            previewMedia: null
        }
    },

    watch: {
        cmsPageState: {
            deep: true,
            handler() {
                this.loadPreviewMedia();
                this.$forceUpdate();
            }
        },
    },

    created() {
        this.createdComponent();
    },

    computed: {
        mediaUrl() {
            const context = Shopware.Context.api;
            const elemData = this.element.data.previewMedia;
            const mediaSource = this.element.config.previewMedia.source;

            if (elemData && elemData.id) {
                return elemData.url;
            }

            if (elemData && elemData.url) {
                return `${context.assetsPath}${elemData.url}`;
            }

            return null;
        },

        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        title() {
            return this.element.config.title.value;
        },

        author() {
            return this.element.config.author.value;
        }
    },

    methods: {
        createdComponent() {
            this.initElementConfig('audio');
            this.initElementData('audio');
            this.loadPreviewMedia();
        },

        loadPreviewMedia() {
            if (!this.element.config.previewMedia.value) {
                this.previewMedia = null;
                return;
            }

            const previewMediaId = this.element.config.previewMedia.value;
            this.mediaRepository.get(previewMediaId, Shopware.Context.api).then((media) => {
                this.previewMedia = media;
            });
        },
    }
});
