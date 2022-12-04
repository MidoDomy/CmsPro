import CustomVideoPlugin from './plugins/custom-video.plugin';
import RowPlugin from './plugins/row.plugin';
import TeaserCollapsePlugin from "./plugins/teaser-collapse.plugin";
import TimelinePlugin from "./plugins/timeline.plugin";
import ContentComparePlugin from "./plugins/content-compare.plugin";

const PluginManager = window.PluginManager;

PluginManager.register('CustomVideo', CustomVideoPlugin, '[data-custom-video]');
PluginManager.register('Row', RowPlugin, '[data-row]');
PluginManager.register('TeaserCollapse', TeaserCollapsePlugin, '[data-teaser-collapse]');
PluginManager.register('Timeline', TimelinePlugin, '[data-timeline]');
PluginManager.register('ContentCompare', ContentComparePlugin, '[data-content-compare]');
