import template from './sw-cms-link.html.twig';
import './sw-cms-link.scss';

export default {
    name: 'sw-cms-link',

    template,

    props: ['value'],

    computed: {
        buttonClass() {
            var classes = `sw-button sw-button--${this.value.type}`;

            // Outline
            classes += this.value.outline ? ' sw-button--outline' : '';

            // Block
            classes += this.value.block ? ' sw-button--block' : '';
            
            // Size
            classes += this.value.size === 'sm' ? ' sw-button--small' : 
                            this.value.size === 'lg' ? ' sw-button--large' : '';

            return classes;
        },
    }
}
