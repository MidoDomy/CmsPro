import template from './sw-cms-block-content-compare.html.twig';
import './sw-cms-block-content-compare.scss';

const { Component } = Shopware;

Component.extend('sw-cms-block-content-compare', 'sw-cms-block-group-predefined', {
    template,

    data() {
        return {
            subSectionNames: [ 'leftContent', 'rightContent' ],
            activeAdditionalSettings: true,
            additionalSettings: {
                posX: 50
            },

            // for handle movements
            posX: 0, 
            dragWidth: 0, 
            minLeft: 0, 
            maxLeft: 0,
            containerOffset: 0,
            containerWidth: 0
        }
    },

    mounted() {
        window.addEventListener('resize', this.init)
        this.init()
        this.setWidth(this.getAdditionalSettingValue('posX'))
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.init)
    },

    methods: {
        init() {
            // get full width
            const containerWidth = this.$refs.mainContainer.clientWidth;

            // set sides width
            this.$refs.leftContent.firstElementChild.style.flex = '0 0 ' + containerWidth + 'px';
            this.$refs.rightContent.firstElementChild.style.flex = '0 0 ' + containerWidth + 'px';
            
            this.$forceUpdate()
        },

        // removes move event when mouseup or mouseleave main element
        onRemoveDrags() {
            this.$refs.divider.parentElement.removeEventListener('mousemove', this.onMove)
        },

        onDrags(e) {
            e.preventDefault();

            // Check if it's a mouse or touch event and pass along the correct value
            var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;
            
            // Get the initial position
            this.dragWidth = this.$refs.divider.offsetWidth;
            this.posX = this.offset(this.$refs.divider).left + this.dragWidth - startX;

            this.containerOffset = this.offset(this.$refs.divider.parentElement).left;
            this.containerWidth = this.$refs.divider.parentElement.offsetWidth;
            
            // Set limits
            this.minLeft = this.containerOffset + 10;
            this.maxLeft = this.containerOffset + this.containerWidth - this.dragWidth - 10;
            
            // Calculate the dragging distance on mousemove.
            this.$refs.divider.parentElement.addEventListener('mousemove', this.onMove)
        },

        // Calculates position of mouse and sets it
        onMove(e) {
            // Check if it's a mouse or touch event and pass along the correct value
            var moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;
            
            var leftValue = moveX + this.posX - this.dragWidth;
            
            // Prevent going off limits
            leftValue = leftValue < this.minLeft ? this.minLeft :
                leftValue > this.maxLeft ? this.maxLeft : leftValue;
            
            // Get value in pertentage
            var widthValue = (leftValue + this.dragWidth/2 - this.containerOffset)*100/this.containerWidth;
            
            // Set the new values for the slider and the handle. 
            this.setWidth(widthValue)
        },

        // Sets width of content containers and handBar
        setWidth(value) {
            this.$refs.leftContent.style.flex = '0 0 ' + value + '%';
            this.$refs.leftContent.style.width = value + '%';
            this.$refs.rightContent.style.flex = '0 0 ' + (100 - value) + '%';
            this.$refs.rightContent.style.width = (100 - value) + '%';

            this.$refs.divider.style.left = value + '%';
        },

        // gets offset width of the element
        offset(el) {
            const box = el.getBoundingClientRect();
            const docElem = document.documentElement;

            return {
                top: box.top + window.pageYOffset - docElem.clientTop,
                left: box.left + window.pageXOffset - docElem.clientLeft
            };
        }
    }
});
