import Plugin from 'src/plugin-system/plugin.class';
import DomAccess from 'src/helper/dom-access.helper';

export default class TeaserCollapsePlugin extends Plugin {

    static options = {
        contentSelector: '.cms-teaser-collapse-content',
        toggleBtnSelector: '.cms-teaser-collapse-btn'
    };

    init() {
        // Select necessary elements
        this.content = DomAccess.querySelector(this.el, this.options.contentSelector);
        this.toggleBtns = DomAccess.querySelectorAll(this.el, this.options.toggleBtnSelector);

        // Functions as variables so they can be removed from listeners
        this.setInitialHeght = this._setInitialHeght.bind(this);
        this.onToggleHeight = this._onToggleHeight.bind(this);

        // Set initial width
        setTimeout(() => {
            this._setInitialHeght();
        }, 100)

        // Register events
        this._registerEvents();
    }

    _setInitialHeght() {
        this.contentHeight = this.content.firstElementChild.offsetHeight;
    }

    // Registers required events
    _registerEvents() {
        // On viewport resize resets initial height
        window.addEventListener('resize', this.setInitialHeght);

        this.toggleBtns.forEach(btn => {
            btn.addEventListener('click', this.onToggleHeight);
        });
    }

    _onToggleHeight() {
        this.content.style.height != '' ? 
            this.content.style.removeProperty('height')
            :
            this.content.style.height = this.contentHeight + 'px';
        
            this.el.classList.toggle('show');
    }
}
