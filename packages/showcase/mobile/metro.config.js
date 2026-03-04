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

// Force singleton packages to always resolve from the mobile project.
// In monorepos, Metro can bundle two copies of react (one from root, one from
// the project) causing "Cannot read property 'use' of null" crashes.
const singletons = ['react', 'react-native', 'react-native-safe-area-context'];

config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Check if this is a singleton or a deep import of one (e.g. react/jsx-runtime)
  const isSingleton = singletons.some(
    (s) => moduleName === s || moduleName.startsWith(s + '/')
  );

  if (isSingleton) {
    // Resolve as if the import originated from the mobile project root
    const mobileContext = {
      ...context,
      resolveRequest: undefined,
      originModulePath: path.join(projectRoot, 'package.json'),
    };
    return context.resolveRequest(mobileContext, moduleName, platform);
  }

  return context.resolveRequest(
    { ...context, resolveRequest: undefined },
    moduleName,
    platform,
  );
};

// Block sibling packages' node_modules to prevent duplicate native modules
const packagesDir = path.join(monorepoRoot, 'packages');
const escapedPath = packagesDir.replace(/[/\\]/g, '[/\\\\]');
config.resolver.blockList = [
  new RegExp(
    `^${escapedPath}[/\\\\](?!showcase[/\\\\]mobile)[^/\\\\]+[/\\\\]node_modules[/\\\\].*$`
  ),
];

module.exports = config;
