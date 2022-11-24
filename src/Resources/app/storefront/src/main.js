import ContentComparePlugin from "./plugins/content-compare.plugin";

const PluginManager = window.PluginManager;

PluginManager.register('ContentCompare', ContentComparePlugin, '[data-content-compare]');
