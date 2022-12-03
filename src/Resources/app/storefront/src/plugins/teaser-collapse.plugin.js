import Plugin from 'src/plugin-system/plugin.class';
import DomAccess from 'src/helper/dom-access.helper';
import ViewportDetection from 'src/helper/viewport-detection.helper';

export default class TeaserCollapsePlugin extends Plugin {

    static options = {
        contentSelector: '.cms-teaser-collapse-content',
        toggleBtnSelector: '.cms-teaser-collapse-btn',
        showClass: 'cms-teaser-collapse--show'
    };

    init() {
        // Select necessary elements
        this.content = DomAccess.querySelector(this.el, this.options.contentSelector);
        this.toggleBtns = DomAccess.querySelectorAll(this.el, this.options.toggleBtnSelector);

        setTimeout(() => {
            // Set initial height
            this._setHeghts();

            // Close 
            this.isOpen = false;
            this.content.style.height = this.minHeight + 'px';
        }, 100)

        // Register events
        this._registerEvents();
    }

    /**
     * Register events
     */
    _registerEvents() {
        // On viewport resize resets initial height
        window.addEventListener('resize', this._setHeghts.bind(this));

        this.toggleBtns.forEach(btn => {
            btn.addEventListener('click', this._onToggleOpen.bind(this));
        });
    }

    /**
     * Sets heights
     */
    _setHeghts() {
        this.minHeight = this._getMinHeght();
        this.maxHeight = this.content.firstElementChild.offsetHeight;

        // Reset height of the content
        this.isOpen ? 
            this.content.style.height = this.maxHeight + 'px'
            :
            this.content.style.height = this.minHeight + 'px';
    }

    /**
     * Returns current viewport min height
     */
    _getMinHeght() {
        const currentViewport = ViewportDetection.getCurrentViewport().toLowerCase();

        if (currentViewport == 'xs' || currentViewport == 'sm') {
            return this.options.sm_closedHeight;
        }
        if (currentViewport == 'md') {
            return this.options.md_closedHeight;
        }

        return this.options.closedHeight;
    }

    /**
     * Toggle height of the inner content
     */
    _onToggleOpen() {
        this.isOpen ? 
            this.content.style.height = this.minHeight + 'px'
            :
            this.content.style.height = this.maxHeight + 'px';
        
        this.el.classList.toggle(this.options.showClass);
        this.isOpen = !this.isOpen;
    }
}
