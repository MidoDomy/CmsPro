import Plugin from 'src/plugin-system/plugin.class';
import DomAccess from 'src/helper/dom-access.helper';
import DeviceDetection from 'src/helper/device-detection.helper';

export default class CustomVideoPlugin extends Plugin {

    static options = {
        videoSelector: 'video',
        previewContentSelector: '.preview-content'
    };
    
    init() {
        this.video = DomAccess.querySelector(this.el, this.options.videoSelector);
        this.previewContent = DomAccess.querySelector(this.el, this.options.previewContentSelector);

        const videoSource = this.video.getAttribute('data-src')
        this.video.setAttribute('src', videoSource);

        this.registerEvents();
    }

    registerEvents() {
        const submitEvent = (DeviceDetection.isTouchDevice()) ? 'touchstart' : 'click';
        this.previewContent.addEventListener(submitEvent, this.playVideo.bind(this));
        this.video.addEventListener("ended", this.endedVideo.bind(this));
    }

    playVideo() {
        const isPlaying = !!(this.video.currentTime > 0 && !this.video.paused && !this.video.ended && this.video.readyState > 2);

        if(isPlaying) {
            this.video.pause();
        }
        else {
            this.video.play();
            this.el.classList.add('is-playing');
        }
    }

    endedVideo() {
        this.el.classList.remove('is-playing');
    }
}
