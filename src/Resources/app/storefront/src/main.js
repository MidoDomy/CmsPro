import ContentComparePlugin from "./plugins/content-compare.plugin";
import TeaserCollapsePlugin from "./plugins/teaser-collapse.plugin";

const PluginManager = window.PluginManager;

PluginManager.register('ContentCompare', ContentComparePlugin, '[data-content-compare]');
PluginManager.register('TeaserCollapse', TeaserCollapsePlugin, '[data-teaser-collapse]');
