import './sw-cms-block.scss';

const { Component } = Shopware;

Component.override('sw-cms-block', {
    data() {
        return {
            fixBlockOverlayZIndex: false
        }
    },

    computed: {
        overlayClasses() {
            return {
                'is--active': this.active,
                'fix--block-overlay-z-index': this.fixBlockOverlayZIndex && !this.active
            };
        }
    },
});
