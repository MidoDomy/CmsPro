import Plugin from 'src/plugin-system/plugin.class';
import ViewportDetection from 'src/helper/viewport-detection.helper';

export default class RowPlugin extends Plugin {

    init() {
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
        // On viewport resize resets initial height
        window.addEventListener('resize', this._setStyles.bind(this));
    }

    /**
     * Sets styles
     */
    _setStyles() {
        const currentViewport = ViewportDetection.getCurrentViewport().toLowerCase();

        if (currentViewport == 'xs' || currentViewport == 'sm') {
            this.el.style.flexDirection = this.options.sm_direction;
            this.el.style.gap = this.options.sm_gap + 'px';
            return;
        }
        if (currentViewport == 'md') {
            this.el.style.flexDirection = this.options.md_direction;
            this.el.style.gap = this.options.md_gap + 'px';
            return;
        }

        this.el.style.flexDirection = this.options.direction;
        this.el.style.gap = this.options.gap + 'px';
    }
}
