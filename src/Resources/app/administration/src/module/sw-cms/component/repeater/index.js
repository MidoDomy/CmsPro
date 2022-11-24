import template from './repeater.html.twig';
import './repeater.scss';

import RepeaterBlock from './utilities/repeater-block';
import RepeaterDropZone from './utilities/repeater-drop-zone';
import './forms';

const { Component } = Shopware;
const { cloneDeep } = Shopware.Utils.object;

Component.register('repeater', {
    template,

    model: {
        prop: 'fields',
        event: 'change'
    },

    props: ['fields', 'formName', 'defaultValue', 'blockName', 'addButtonText'],

    components: {
        'repeater-block': RepeaterBlock,
        'repeater-drop-zone': RepeaterDropZone
    },
    
    data () {
        return {
            pFields: this.fields.map(
                el => ({
                    ...el,
                    id: Math.ceil(Math.random() * 1000000000)
                })
            ),
            entered: -1
        }
    },

    methods: {
        setFields (newFields) {
            this.pFields = newFields;
            this.$emit('change', this.pFields);
        },
        add () {
            const newFields = cloneDeep(this.pFields);
            const newField = {
                id: Math.ceil(Math.random() * 1000000000),
                name: this.formName,
                value: cloneDeep(this.defaultValue)
            };
            newFields.push(newField);
            this.setFields(newFields);
        },
        remove (index) {
            const newFields = cloneDeep(this.pFields);
            newFields.splice(index, 1);
            this.setFields(newFields);
        },
        move (from, to) {
            from = parseInt(from, 10) || 0;
            const newFields = cloneDeep(this.pFields);
            let el = newFields.splice(from, 1);
            newFields.splice(to, 0, el[0]);
            this.setFields(newFields);
            this.entered = -1;
        }
    }
});