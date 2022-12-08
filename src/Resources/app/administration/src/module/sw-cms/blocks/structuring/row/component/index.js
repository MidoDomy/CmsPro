import template from './sw-cms-block-row.html.twig';
import './sw-cms-block-row.scss';

const { Component } = Shopware;

Component.extend('sw-cms-block-row', 'sw-cms-block-group-dynamic', {
    template,

    data() {
        return {
            slotItemPrefix: 'Col',
            activeAdditionalSettings: true,
            additionalSettings: {
                gutter: 40,
                md_gutter: 40,
                sm_gutter: 40,
                direction: 'row',
                md_direction: 'row',
                sm_direction: 'column'
            }
        }
    },

    computed: {
        gutter() {
            return this.getAdditionalSettingValue('gutter', true);
        },

        direction() {
            return this.getAdditionalSettingValue('direction', true);
        },

        rowStyles() {
            return {
                gap: `${this.gutter}px`, 
                flexDirection: this.direction
            }
        }
    }
});
