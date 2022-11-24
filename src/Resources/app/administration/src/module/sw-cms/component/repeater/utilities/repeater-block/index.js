import template from './repeater-block.html.twig';
import './repeater-block.scss';

const indexArr = [];

export default {
    name: 'repeater-block',

    template,

    props: ['isFirst', 'isLast', 'index', 'id', 'count', 'blockName'],

    data () {
        return {
            isExpanded: false,
            contentStyle: {
                maxHeight: 0
            }
        }
    },
    
    created() {
        indexArr.push({initialIndex: this.index + 1, itemId: this.id});
    },

    computed: {
        itemIndex() {
            const currentItem = indexArr.filter(item => item.itemId === this.id);
            return currentItem[0].initialIndex;
        },
    },

    methods: {
        toggleCollapsible () {
            this.isExpanded ? this.isExpanded = false : this.isExpanded = true;

            this.contentStyle.maxHeight = !this.isExpanded ? 0 : "800px"
        }
    }
}