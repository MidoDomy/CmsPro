import template from './sw-cms-el-video.html.twig';
import './sw-cms-el-video.scss';

const { Component, Mixin } = Shopware;

Component.register('sw-cms-el-video', {
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
    },

    methods: {
        createdComponent() {
            this.initElementConfig('video');
            this.initElementData('video');
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
