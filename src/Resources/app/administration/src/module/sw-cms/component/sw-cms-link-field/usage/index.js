import template from './sw-cms-link.html.twig';
import './sw-cms-link.scss';

export default {
    name: 'sw-cms-link',

    template,

    props: ['value'],

    computed: {
        buttonClass() {
            const style = this.value.style === 'primary' ? 'sw-button sw-button--primary' : this.value.style === 'secondary' ? 'sw-button sw-button--secondary': 'sw-button--link';
            const size = this.value.size === 'sm' ? 'sw-button--small' : this.value.size === 'lg' ? 'sw-button--large' : '';

            return `${style} ${size}`;
        },
    }
}
