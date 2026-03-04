const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '..', '..', '..');

const config = getDefaultConfig(projectRoot);

// Watch the monorepo root for live changes to sibling packages
config.watchFolders = [monorepoRoot];

// Resolve node_modules from both the project and monorepo root (hoisted)
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

// Block sibling packages' node_modules to prevent duplicate native modules
const packagesDir = path.join(monorepoRoot, 'packages');
const escapedPath = packagesDir.replace(/[/\\]/g, '[/\\\\]');
config.resolver.blockList = [
  new RegExp(
    `^${escapedPath}[/\\\\](?!showcase[/\\\\]mobile)[^/\\\\]+[/\\\\]node_modules[/\\\\].*$`
  ),
];

module.exports = config;
