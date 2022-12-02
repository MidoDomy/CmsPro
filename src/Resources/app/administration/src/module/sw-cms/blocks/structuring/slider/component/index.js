import template from './sw-cms-block-slider.html.twig';
import './sw-cms-block-slider.scss';

const { Component } = Shopware;

Component.extend('sw-cms-block-slider', 'sw-cms-block-group-dynamic', {
    template,

    data() {
        return {
            slotItemPrefix: 'Slide',
            activeAdditionalSettings: true,
            additionalSettings: {
                numberOfDisplayedSlides: 1,
                md_numberOfDisplayedSlides: 1,
                sm_numberOfDisplayedSlides: 1,
                gutter: 60,
                md_gutter: 30,
                sm_gutter: 0,
                edgePadding: 0,
                md_edgePadding: 0,
                sm_edgePadding: 0,
                startIndex: 1,
                speed: 300,
                autoplay: false,
                autoplayTimeout: 1000,
                autoHeight: false,
                mouseDrag: false,
                controls: true,
                controlsPosition: 'inside'
            }
        }
    },

    computed: {
        numberOfDisplayedSlides() {
            return this.getCFValue('numberOfDisplayedSlides', true);
        },

        gutter() {
            return this.getCFValue('gutter', true);
        },

        edgePadding() {
            return this.getCFValue('edgePadding', true);
        },

        controls() {
            return this.getCFValue('controls');
        },

        controlsPosition() {
            return this.getCFValue('controlsPosition');
        },

        sliderContentStyles() {
            return {
                marginRight: -this.gutter + 'px',
                padding: `0 ${this.edgePadding}px`
            }
        },

        sliderItemStyles() {
            return {
                flex: `0 0 ${100 / this.numberOfDisplayedSlides}%`,
                paddingRight: this.gutter + 'px'
            }
        }
    },

    methods: {
        slidePrev() {
            this.activePanelIndex = this.activePanelIndex == 0 ? this.panels.length - 1 : this.activePanelIndex - 1;
        },

        slideNext() {
            this.activePanelIndex = this.activePanelIndex == this.panels.length - 1 ? 0 : this.activePanelIndex + 1;
        },

        showSlide(index) {
            return index >= this.activePanelIndex && index < this.activePanelIndex + this.numberOfDisplayedSlides;
        }
    }
});
