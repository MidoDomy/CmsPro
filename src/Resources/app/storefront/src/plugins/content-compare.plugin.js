import Plugin from 'src/plugin-system/plugin.class';
import DomAccess from 'src/helper/dom-access.helper';

export default class ContentComparePlugin extends Plugin {

    static options = {
        dividerSelector: '.cms-content-compare-divider',
        leftContentSelector: '.left-content',
        rightContentSelector: '.right-content'
    };

    init() {
        // Select necessary elements
        this.leftContent = DomAccess.querySelector(this.el, this.options.leftContentSelector);
        this.rightContent = DomAccess.querySelector(this.el, this.options.rightContentSelector);
        this.divider = DomAccess.querySelector(this.el, this.options.dividerSelector);

        // Functions as variables so they can be removed from listeners
        this.onMove = this._onMove.bind(this);
        this.setInitialWidth = this._setInitialWidth.bind(this);
        this.onDividerMouseDown = this._onDividerMouseDown.bind(this);
        this.onDividerMouseUp = this._onDividerMouseUp.bind(this);

        // Set initial width
        setTimeout(() => {
            this._setInitialWidth();
        }, 100)
        this._setWidth(this.options.posX)

        // Register events
        this._registerEvents();
    }

    // Sets initial width of the side inner contents
    _setInitialWidth() {
        // get full width
        const containerWidth = this.el.clientWidth;

        // set width of the sides content
        this.leftContent.firstElementChild.style.flex = '0 0 ' + containerWidth + 'px';
        this.rightContent.firstElementChild.style.flex = '0 0 ' + containerWidth + 'px';
    }

    // Registers required events
    _registerEvents() {
        // On viewport resize resets initial width
        window.addEventListener('resize', this.setInitialWidth);
        // On mousedown adds mousemove listener on Divider
        this.divider.addEventListener('mousedown', this.onDividerMouseDown)

        // On container mouseup or mouseleave removes listener from Divider
        this.el.addEventListener('mouseup', this.onDividerMouseUp)
        this.el.addEventListener('mouseleave', this.onDividerMouseUp)
    }

    // Removes listener from Divider
    _onDividerMouseUp() {
        this.el.removeEventListener('mousemove', this.onMove)
    }

    // Sets initial values and adds mousemove listener on Divider
    _onDividerMouseDown(e) {
        // Check if it's a mouse or touch event and pass along the correct value
        var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;
        
        // Get the initial position
        this.dragWidth = this.divider.offsetWidth;
        this.posX = this._offset(this.divider).left + this.dragWidth - startX;

        this.containerOffset = this._offset(this.el).left;
        this.containerWidth = this.el.offsetWidth;
        
        // Set limits
        this.minLeft = this.containerOffset + 10;
        this.maxLeft = this.containerOffset + this.containerWidth - this.dragWidth - 10;
        
        // Calculate the dragging distance on mousemove.
        this.el.addEventListener('mousemove', this.onMove)
    }

    // Calculates position of mouse and sets it
    _onMove(e) {
        // Check if it's a mouse or touch event and pass along the correct value
        var moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;
        
        var leftValue = moveX + this.posX - this.dragWidth;
        
        // Prevent going off limits
        leftValue = leftValue < this.minLeft ? this.minLeft :
            leftValue > this.maxLeft ? this.maxLeft : leftValue;
        
        // Get value in pertentage
        var widthValue = (leftValue + this.dragWidth/2 - this.containerOffset)*100/this.containerWidth;
        
        this._setWidth(widthValue)
    }

    // Sets width of sides inner content and Divider position
    _setWidth(value) {
        this.leftContent.style.flex = '0 0 ' + value + '%';
        this.leftContent.style.width = value + '%';

        this.rightContent.style.flex = '0 0 ' + (100 - value) + '%';
        this.rightContent.style.width = (100 - value) + '%';

        this.divider.style.left = value + '%';
    }

    // Gets offset of the element
    _offset(el) {
        const box = el.getBoundingClientRect();
        const docElem = document.documentElement;

        return {
            top: box.top + window.pageYOffset - docElem.clientTop,
            left: box.left + window.pageXOffset - docElem.clientLeft
        };
    }
}
