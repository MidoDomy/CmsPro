import Plugin from 'src/plugin-system/plugin.class';
import DomAccess from 'src/helper/dom-access.helper';
import ViewportDetection from 'src/helper/viewport-detection.helper';

export default class TimelinePlugin extends Plugin {

    static options = {
        itemSelector: '.cms-block-timeline-item',
        itemLeftClass: 'cms-block-timeline-item--left',
        itemRightClass: 'cms-block-timeline-item--right',
    };

    init() {
        // Select necessary elements
        this.items = DomAccess.querySelectorAll(this.el, this.options.itemSelector);

        this._setCurrentOptions();
        setTimeout(() => {
            this._setStyles();
        }, 100)

        // Register events
        this._registerEvents();
    }

    /**
     * Register events
     */
    _registerEvents() {
        window.addEventListener('resize', this._setStyles.bind(this));
    }

    _setStyles() {
        this._setCurrentOptions();

        if (this.currentPosition == 'left') {
            this.el.classList.add('left');
            this.el.classList.remove('center');
            this.el.classList.remove('right');
        }
        else if (this.currentPosition == 'right') {
            this.el.classList.remove('left');
            this.el.classList.remove('center');
            this.el.classList.add('right');
        }
        else {
            this.el.classList.remove('left');
            this.el.classList.add('center');
            this.el.classList.remove('right');
        }

        this.items.forEach((item, index) => {
            item.firstElementChild.style.padding = this.currentPadding + 'px';

            if (this.currentPosition == 'left') {
                item.classList.remove(this.options.itemLeftClass);
                item.classList.add(this.options.itemRightClass);
            }
            else if (this.currentPosition == 'right') {
                item.classList.add(this.options.itemLeftClass);
                item.classList.remove(this.options.itemRightClass);
            }
            else if (index % 2 == 1) {
                item.classList.remove(this.options.itemLeftClass);
                item.classList.add(this.options.itemRightClass);
            }
            else {
                item.classList.add(this.options.itemLeftClass);
                item.classList.remove(this.options.itemRightClass);
            }
        });
    }

    /**
     * Sets current viewport values
     */
    _setCurrentOptions() {
        const currentViewport = ViewportDetection.getCurrentViewport().toLowerCase();

        if (currentViewport == 'xs' || currentViewport == 'sm') {
            this.currentPosition = this.options.sm_position;
            this.currentPadding = this.options.sm_padding;
            return;
        }

        if (currentViewport == 'md') {
            this.currentPosition = this.options.md_position;
            this.currentPadding = this.options.md_padding;
            return;
        }

        this.currentPosition = this.options.position;
        this.currentPadding = this.options.padding;
    }
}
