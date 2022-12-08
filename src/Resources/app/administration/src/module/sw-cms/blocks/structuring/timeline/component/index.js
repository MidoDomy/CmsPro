import template from './sw-cms-block-timeline.html.twig';
import './sw-cms-block-timeline.scss';

const { Component } = Shopware;

Component.extend('sw-cms-block-timeline', 'sw-cms-block-group-dynamic', {
    template,

    data() {
        return {
            slotItemPrefix: 'Item',
            activeAdditionalSettings: true,
            additionalSettings: {
                position: 'center',
                md_position: 'center',
                sm_position: 'left',
                padding: 20,
                md_padding: 20,
                sm_padding: 10
            }
        }
    },

    computed: {
        position() {
            return this.getAdditionalSettingValue('position', true);
        },

        padding() {
            return this.getAdditionalSettingValue('padding', true);
        },

        itemStyles() {
            return {
               width: this.position == 'center' ? '50%' : '100%',
               marginBottom: this.position == 'center' ? '' : '20px'
            }
        },

        itemInnerStyles() {
            return {
                padding: `${this.padding}px`
            }
        }
    },

    methods: {
        itemClasses(index) {
            return this.position == 'left' ? 'sw-cms-block-timeline__item--right' 
                    :
                this.position == 'right' ? 'sw-cms-block-timeline__item--left'
                        :
                    index % 2 == 1 ? 'sw-cms-block-timeline__item--right'
                            :
                        'sw-cms-block-timeline__item--left';
        }
    }
});
