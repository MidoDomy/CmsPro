import template from './sw-cms-block-slider.html.twig';
import './sw-cms-block-slider.scss';

const { Component } = Shopware;

Component.extend('sw-cms-block-slider', 'sw-cms-block-group-dynamic', {
    template,

    data() {
        return {
            slotItemPrefix: 'Slide'
        }
    },

    created() {
        /** Activate additional settings */
        this.$parent.block.cmsBlockCustomConfig.cmsBlockAdditionaManagement = true;

        /** Additional settings */
        if (!this.block.customFields) {
            this.block.customFields = {
                numberOfDisplayedSlides: 3,
                gap: 30,
                startIndex: 0,
                speed: 300,
                autoplay: false,
                autoplayTimeout: 1000,
                autoHeight: false,
                mouseDrag: false,
                controls: true
            }
        }
    },

    computed: {
        sliderOptions() {
            return {
                numberOfDisplayedSlides: this.block.customFields.numberOfDisplayedSlides,
                gap: this.block.customFields.gap,
                controls: this.block.customFields.controls
            }
        },

        numberOfDisplayedSlides() {
            return this.sliderOptions.numberOfDisplayedSlides;
        },

        sliderContentStyles() {
            return {
                marginRight: -this.sliderOptions.gap + 'px'
            }
        },

        sliderItemStyles() {
            return {
                flex: `0 0 ${100 / this.sliderOptions.numberOfDisplayedSlides}%`,
                paddingRight: this.sliderOptions.gap + 'px'
            }
        },

        showArrows() {
            return this.sliderOptions.controls;
        }
    },

    methods: {
        slidePrev() {
            this.activePanelIndex = this.activePanelIndex == 0 ? this.panels.length - this.numberOfDisplayedSlides : this.activePanelIndex - 1;
        },

        slideNext() {
            this.activePanelIndex = this.activePanelIndex == this.panels.length - this.numberOfDisplayedSlides ? 0 : this.activePanelIndex + 1;
        },

        showSlide(index) {
            return index >= this.activePanelIndex && index < this.activePanelIndex + this.numberOfDisplayedSlides;
        }
    }
});
