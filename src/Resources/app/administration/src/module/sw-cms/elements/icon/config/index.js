import template from './sw-cms-el-icon.html.twig';

const { Component, Mixin } = Shopware;

Component.register('sw-cms-el-config-icon', {
    template,

    inject: ['repositoryFactory'],

    mixins: [
        Mixin.getByName('cms-element')
    ],

    data() {
        return {
            mediaModalIsOpen: false,
            initialFolderId: null
        };
    },

    created() {
        this.createdComponent();
    },

    computed: {
        uploadTag() {
            return `cms-element-media-config-${this.element.id}`;
        },

        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        previewSource() {
            if (this.element.data && this.element.data.media && this.element.data.media.id) {
                return this.element.data.media;
            }

            return this.element.config.media.value;
        }
    },

    methods: {
        createdComponent() {
            this.initElementConfig('icon');
            this.initElementData('icon');
        },

        async onImageUpload({ targetId }) {
            const mediaEntity = await this.mediaRepository.get(targetId, Shopware.Context.api);

            this.element.config.media.value = mediaEntity.id;

            this.updateElementData(mediaEntity);

            this.$emit('element-update', this.element);
        },

        onImageRemove() {
            this.element.config.media.value = null;

            this.updateElementData();

            this.$emit('element-update', this.element);
        },

        onCloseModal() {
            this.mediaModalIsOpen = false;
        },

        onSelectionChanges(mediaEntity) {
            const media = mediaEntity[0];
            this.element.config.media.value = media.id;

            this.updateElementData(media);

            this.$emit('element-update', this.element);
        },

        updateElementData(media = null) {
            this.$set(this.element.data, 'mediaId', media === null ? null : media.id);
            this.$set(this.element.data, 'media', media);
        },

        onOpenMediaModal() {
            this.mediaModalIsOpen = true;
        },

        onInput(title) {
            if (title !== this.element.config.text.value) {
                this.element.config.text.value = title;
                this.$emit('element-update', this.element);
            }
        }
    }
});