import Plugin from 'src/plugin-system/plugin.class';
import ViewportDetection from 'src/helper/viewport-detection.helper';

export default class ResponsiveStylesPlugin extends Plugin {

    init() {
        this._setStyles();

        // Register events
        this._registerEvents();
    }

    /**
     * Register events
     */
    _registerEvents() {
        window.addEventListener('resize', this._setStyles.bind(this));
    }

    /**
     * Sets styles
     */
    _setStyles() {
        this.options.styleMap.forEach(obj => {
            let fieldValue = this.options.styleFields[this._getCurrentPrefix() + obj.name];
            this.el.style[obj.property] = (fieldValue ? fieldValue : obj.defaultValue) + obj.unit;
        });
    }

    /**
     * Return current viewport prefix
     * @returns 
     */
    _getCurrentPrefix() {
        const currentViewport = ViewportDetection.getCurrentViewport().toLowerCase();
    
        if (currentViewport == 'xs' || currentViewport == 'sm') {
            return 'sm_';
        }
        if (currentViewport == 'md') {
            return 'md_';
        }

        return '';
    }
}
