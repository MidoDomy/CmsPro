import template from './sw-cms-el-config-audio.html.twig';
import './sw-cms-el-config-audio.scss';

const { Component, Mixin } = Shopware;

Component.register('sw-cms-el-config-audio', {
    template,

    inject: [
        'systemConfigApiService',
        'acl',
    ],

    mixins: [
        Mixin.getByName('cms-element')
    ],

    inject: ['repositoryFactory'],

    data() {
        return {
            mediaModalIsOpen: false,
            initialFolderId: null,
            openModalTarget: 'media',
            previewMedia: null
        };
    },

    computed: {
        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        uploadTag() {
            return `cms-element-audio-config-media-${this.element.id}`;
        },

        previewUploadTag() {
            return `cms-element-audio-config-media-preview-${this.element.id}`;
        }
    },

    created() {
        this.createdComponent();
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

        previewSource(target) {
            if (this.element.data && this.element.data[target] && this.element.data[target].id) {
                return this.element.data[target];
            }

            return this.element.config[target].value;
        },

        async onImageUpload({ targetId }) {
            const mediaEntity = await this.mediaRepository.get(targetId, Shopware.Context.api);

            this.element.config.media.value = mediaEntity.id;

            this.updateElementData(mediaEntity);

            this.$emit('element-update', this.element);
        },

        async onPreviewUpload({ targetId }) {
            const mediaEntity = await this.mediaRepository.get(targetId, Shopware.Context.api);

            this.element.config.previewMedia.value = mediaEntity.id;

            this.loadPreviewMedia();

            this.$emit('element-update', this.element);
        },

        onMediaModalRemove() {
            if (this.openModalTarget === 'media') {
                this.onMediaRemove();
            } else {
                this.onPreviewRemove();
            }
        },

        onMediaRemove() {
            this.element.config.media.value = null;

            this.updateElementData();

            this.$emit('element-update', this.element);
        },

        onPreviewRemove() {
            this.element.config.previewMedia.value = null;
            this.previewMedia = null;

            this.$emit('element-update', this.element);
        },

        onCloseModal() {
            this.mediaModalIsOpen = false;
        },

        onSelectionChanges(mediaEntity) {
            const media = mediaEntity[0];
            this.element.config[this.openModalTarget].value = media.id;

            if (this.openModalTarget === 'previewMedia') {
                this.loadPreviewMedia();
            } else {
                this.updateElementData(media);
            }

            this.$emit('element-update', this.element);
        },

        updateElementData(media = null) {
            const mediaId = media === null ? null : media.id;

            if (!this.element.data) {
                this.$set(this.element, 'data', { mediaId });
                this.$set(this.element, 'data', { media });
            } else {
                this.$set(this.element.data, 'mediaId', mediaId);
                this.$set(this.element.data, 'media', media);
            }

            if(this.element.data.media) {
                if(this.element.data.media.fileExtension !== "mp3") {
                    this.onMediaRemove();
                }
            }
        },

        onOpenMediaModal(target) {
            this.openModalTarget = target;
            this.mediaModalIsOpen = true;
        },

        onInputTitle(title) {
            if (title !== this.element.config.title.value) {
                this.element.config.title.value = title;
                this.$emit('element-update', this.element);
            }
        },

        onInputAuthor(author) {
            if (author !== this.element.config.author.value) {
                this.element.config.author.value = author;
                this.$emit('element-update', this.element);
            }
        }
    }
});
