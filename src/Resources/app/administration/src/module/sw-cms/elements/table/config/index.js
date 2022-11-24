import template from './sw-cms-el-config-table.html.twig';
import './sw-cms-el-config-table.scss';

const { Component, Mixin } = Shopware;

Component.register('sw-cms-el-config-table', {
    template,

    mixins: [
        Mixin.getByName('cms-element')
    ],

    data() {
        return {
            // default values for newly added cells
            defaultValue: ""
        }
    },

    computed: {
        table() {
            return this.element.config.fields.value;
        }
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('table');
            this.initElementData('table');
        },

        addRow(position) {
            // initialize new array(row) with default value
            const newRow = Array.apply(null, Array(this.table[0].length)).map(() => { return this.defaultValue; });

            // push it on the end of the table array
            this.table.splice(position, 0, newRow)
        },

        removeRow(position) {
            this.table.splice(position, 1)
        },

        addCol(position) {
            this.table.map(row => {
                row.splice(position, 0, this.defaultValue)
            });
        },

        removeCol(position) {
            this.table.map(row => {
                row.splice(position, 1)
            });
        }
    }
});