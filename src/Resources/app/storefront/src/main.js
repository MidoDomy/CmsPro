import ContentComparePlugin from "./plugins/content-compare.plugin";
import TeaserCollapsePlugin from "./plugins/teaser-collapse.plugin";
import TimelinePlugin from "./plugins/timeline.plugin";
import CustomVideoPlugin from './plugins/custom-video.plugin';

const PluginManager = window.PluginManager;

PluginManager.register('ContentCompare', ContentComparePlugin, '[data-content-compare]');
PluginManager.register('TeaserCollapse', TeaserCollapsePlugin, '[data-teaser-collapse]');
PluginManager.register('Timeline', TimelinePlugin, '[data-timeline]');
PluginManager.register('CustomVideoPlugin', CustomVideoPlugin, '[data-custom-video]');
