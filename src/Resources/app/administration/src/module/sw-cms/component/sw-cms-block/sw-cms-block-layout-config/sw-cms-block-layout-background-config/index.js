import template from './sw-cms-block-layout-background-config.html.twig';
import './sw-cms-block-layout-background-config.scss';

const { Component, Mixin } = Shopware;

Component.register('sw-cms-block-layout-background-config', {
    template,

    inject: [ 'repositoryFactory', 'cmsService' ],

    mixins: [
      Mixin.getByName('cms-state')
    ],

    props: {
        block: {
            type: Object,
            required: true
        }
    },

    computed: {
        // Checks if the current viewport is desktop
        notResponsive() {
            return this.currentDeviceView != 'desktop';
        },

        uploadTag() {
            return `cms-block-media-config-${this.block.id}`;
        },

        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        backgroundImage() {
            return this.block && this.block.backgroundMedia && this.block.backgroundMedia.id ? this.block.backgroundMedia : null
        }
    },

    methods: {
        onSetBackgroundMedia([mediaItem]) {
            this.block.backgroundMediaId = mediaItem.id;
            this.block.backgroundMedia = mediaItem;
        },

        successfulUpload(media) {
            this.block.backgroundMediaId = media.targetId;

            this.mediaRepository.get(media.targetId).then((mediaItem) => {
                this.block.backgroundMedia = mediaItem;
            });
        },

        removeMedia() {
            this.block.backgroundMediaId = null;
            this.block.backgroundMedia = null;
        }
    }
});
