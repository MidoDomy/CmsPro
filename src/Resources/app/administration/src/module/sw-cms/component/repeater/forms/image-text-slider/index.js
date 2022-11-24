import template from './image-text-slider.html.twig';
import './image-text-slider.scss';

const { Component } = Shopware;
const { cloneDeep } = Shopware.Utils.object;
const Criteria = Shopware.Data.Criteria;
const { mapState } = Shopware.Component.getComponentHelper();


Component.register('image-text-slider', {
    template,

    inject: ['repositoryFactory'],

    props: {
        value: {
            type: Object,
            required: true
        },
        index: {
            type: Number
        }
    },

    data() {
        return {
            mediaModalIsOpen: false,
            initialFolderId: null,
            entity: this.element,
            mediaItems: [],
            sliderItemMediaUrl: ''
        };
    },

    computed: {
        sliderInfo: {
          get () { return this.value },
          set (sliderInfo) { this.$emit('input', sliderInfo) }
        },

        ...mapState('imageTextSlider', [
            'element',
            'defaultFolder',
            'cmsPageState'
        ]),

        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        uploadTag() {
            return `cms-element-config-${this.index}`;
        },

        previewSource() {
            if(this.element.data.sliderItems && this.sliderInfo.imageId) {
                let dataProperty = this.element.data.sliderItems.find(element => element.media.id === this.sliderInfo.imageId);
    
                if(dataProperty) 
                    return dataProperty.media;
            }
                
            if(this.sliderInfo.imageId) 
                return this.sliderInfo.imageId;
        },

        sliderItems() {
            if (this.element.data && this.element.data.sliderItems && this.element.data.sliderItems.length > 0) {
                return this.element.data.sliderItems;
            }

            return [];
        },

        mediaUrl() {
            if(this.element.config.sliderItems.value && this.element.data.sliderItems) {
                const dataProperty = this.element.data.sliderItems.find(element => element.media.id === this.sliderInfo.imageId);

                if (dataProperty && dataProperty.media.url) {
                    return dataProperty.media.url;
                }
            } 

            return '';
        }
    },

    created() {
        this.createdComponent();
    },

    methods: {
        async createdComponent() {
            if (this.element.config.sliderItems.value.length > 0) {
                const mediaIds = this.element.config.sliderItems.value.map((configElement) => {
                    return configElement.mediaId;
                });

                const criteria = new Criteria(mediaIds);
                this.mediaItems = await this.mediaRepository.search(criteria, Shopware.Context.api);
            }
        },

        async successfulUpload({ targetId }) {
            const mediaItem = await this.mediaRepository.get(targetId, Shopware.Context.api);
            this.$forceUpdate();

            /* Emit a root event, so it can be caught in the element config, and thus update the config */
            this.$root.$emit('image-text-slider-config-update', mediaItem);

            this.sliderInfo.imageId = mediaItem.id;
            this.sliderInfo.hasImage = true;
            this.mediaItems.push(mediaItem);
            this.updateMediaDataValue();
        },

        onItemRemove() {
            const key = this.sliderInfo.imageId;

            this.element.config.sliderItems.value =
                this.element.config.sliderItems.value.filter(
                    item => (item.mediaId !== key)
                );

            this.mediaItems = this.mediaItems.filter(
                item => (item.id !== key)
            );

            this.updateMediaDataValue();
            this.sliderInfo.imageId = 0;
            this.sliderInfo.hasImage = false;
        },

        onMediaSelectionChange(mediaItems) {
            mediaItems.forEach((item) => {
                /* Emit a root event, so it can be caught in the element config, and thus update the config */
                this.$root.$emit('image-text-slider-config-update', item);

                this.sliderInfo.imageId = item.id;
                this.sliderInfo.hasImage = true;
            });
            this.mediaItems.push(...mediaItems);

            this.updateMediaDataValue();
        },

        updateMediaDataValue() {
            if (this.element.config.sliderItems.value) {
                const sliderItems = cloneDeep(this.element.config.sliderItems.value);
                
                sliderItems.forEach((galleryItem) => {
                    this.mediaItems.forEach((mediaItem) => {
                        if (galleryItem.mediaId === mediaItem.id) {
                            galleryItem.media = mediaItem;
                        }
                    });
                });

                /* Emit a root event, so it can be caught in the element config in order to update the element data */
                this.$root.$emit('image-text-slider-data-update', sliderItems);
            }
        },

        onOpenMediaModal() {
            this.mediaModalIsOpen = true;
        },

        onCloseMediaModal() {
            this.mediaModalIsOpen = false;
        }
    }
});
