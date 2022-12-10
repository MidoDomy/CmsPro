import template from './sw-cms-block.html.twig';
import './sw-cms-block.scss';

const { Component, Mixin } = Shopware;

Component.override('sw-cms-block', {
    template,

    mixins: [
        Mixin.getByName('cms-state'),
    ],

    data() {
        return {
            fixBlockOverlayZIndex: false
        }
    },

    created() {
        if (!this.block.customFields) {
            this.block.customFields = {};
        }
    },

    computed: {
        overlayClasses() {
            return {
                'is--active': this.active,
                'fix--block-overlay-z-index': this.fixBlockOverlayZIndex && !this.active
            };
        },

        /** Sends prefix of the current viewport
         * prefixes are used for dynamic variables
         * example: customFields[currentViewportPrefix + 'variableName'] */ 
        currentViewportPrefix() {
            return this.currentDeviceView === 'mobile' ? 'sm_' : 
                this.currentDeviceView === 'tablet-landscape' ? 'md_' : '';
        },

        customFields() {
            return this.block.customFields;
        },

        blockBackground() {
            let backgroundMedia = null;
    
            if (this.block.backgroundMedia) {
                if (this.block.backgroundMedia.id) {
                    backgroundMedia = `url("${this.block.backgroundMedia.url}")`;
                } else {
                    backgroundMedia = `url('${this.assetFilter(this.block.backgroundMedia.url)}')`;
                }
            }

            return {
                'background-color': this.block.backgroundColor || 'transparent',
                'background-image': backgroundMedia,
                'background-size': this.block.backgroundMediaMode,
            };
        },

        blockStyles() {
            return {
                'flex': this.getValue('width') ? '0 0 ' + (100/12 * this.getValue('width')) + '%' : '0 0 100%',
                'order': `${this.getValue('sort') ?? 999}`,
                'align-self': `${this.getValue('verticalAlign') ?? 'flex-start'}`,
                'padding-top': `${this.getValue('marginTop') ?? 0}px`,
                'padding-bottom': `${this.getValue('marginBottom') ?? 0}px`,
                'padding-left': `${this.getValue('marginLeft') ?? 0}px`,
                'padding-right': `${this.getValue('marginRight') ?? 0}px`
            };
        },

        blockContentStyles() {
            return {
                'min-height': `${this.getValue('minHeight') ?? 0}px`,
                'border-top-width': `${this.getValue('borderTopWidth') ?? 0}px`,
                'border-bottom-width': `${this.getValue('borderBottomWidth') ?? 0}px`,
                'border-left-width': `${this.getValue('borderLeftWidth') ?? 0}px`,
                'border-right-width': `${this.getValue('borderRightWidth') ?? 0}px`,
                'padding-top': `${this.getValue('paddingTop') ?? 0}px`,
                'padding-bottom': `${this.getValue('paddingBottom') ?? 0}px`,
                'padding-left': `${this.getValue('paddingLeft') ?? 0}px`,
                'padding-right': `${this.getValue('paddingRight') ?? 0}px`,
                'border-color': `${this.getValue('borderColor') ?? 'transparent'}`,
                'border-style': `${this.getValue('borderStyle') ?? 'solid'}`,
                'border-top-left-radius': `${this.getValue('borderRadiusTopLeft') ?? 0}px`,
                'border-top-right-radius': `${this.getValue('borderRadiusTopRight') ?? 0}px`,
                'border-bottom-right-radius': `${this.getValue('borderRadiusBottomRight') ?? 0}px`,
                'border-bottom-left-radius': `${this.getValue('borderRadiusBottomLeft') ?? 0}px`,
                'box-shadow': `${this.customFields.boxShadowType == 'inset' ? 'inset' : ''} ${this.customFields.boxShadowXOffset ?? '0'}px ${this.customFields.boxShadowYOffset ?? '0'}px ${this.customFields.boxShadowBlur ?? '0'}px ${this.customFields.boxShadowSpread ?? '0'}px ${this.customFields.boxShadowColor ?? 'transparent'}`,
            };
        },

        overlayStyles() {
            return {
                'top': `${this.getValue('marginTop') - 1 ?? -1}px`,
                'bottom': `${this.getValue('marginBottom') - 1 ?? -1}px`,
                'left': `${this.getValue('marginLeft') - 1 ?? -1}px`,
                'right': `${this.getValue('marginRight') - 1 ?? -1}px`
            };
        }
    },

    methods: {
        getValue(name) {
            return this.customFields[this.currentViewportPrefix + name];
        }
    }
});
