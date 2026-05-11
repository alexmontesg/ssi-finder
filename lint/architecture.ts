const plugin: Deno.lint.Plugin = {
  name: 'arch-enforce',
  rules: {
    'no-outward-dependencies': {
      create(context) {
        const filename = context.filename;

        const isCore = filename.includes('/core/');
        const isLib = filename.includes('/lib/');
        const isProviders = filename.includes('/providers/');

        const providerMatch = filename.match(/\/providers\/([^/]+)\//);
        const currentProvider = providerMatch ? providerMatch[1] : null;

        return {
          ImportDeclaration(node) {
            const importPath = node.source.value as string;

            const targetIsProviders = importPath.includes('/providers/');
            const targetIsLib = importPath.includes('/lib/');

            if (isCore) {
              if (targetIsLib) {
                context.report({
                  node,
                  message:
                    `[ARCH] core/ cannot depend on lib/. Import from "${importPath}" is forbidden.`,
                });
              }
              if (targetIsProviders) {
                context.report({
                  node,
                  message:
                    `[ARCH] core/ cannot depend on providers/. Import from "${importPath}" is forbidden.`,
                });
              }
            }

            if (isLib) {
              if (targetIsProviders) {
                context.report({
                  node,
                  message:
                    `[ARCH] lib/ cannot depend on providers/. Import from "${importPath}" is forbidden.`,
                });
              }
            }

            if (isProviders && currentProvider && targetIsProviders) {
              const targetMatch = importPath.match(/\/providers\/([^/]+)\//);
              const targetProvider = targetMatch ? targetMatch[1] : null;

              if (targetProvider && targetProvider !== currentProvider) {
                context.report({
                  node,
                  message:
                    `[ARCH] Provider "${currentProvider}" cannot import from provider "${targetProvider}". Use core/ or lib/ for shared code.`,
                });
              }
            }
          },
        };
      },
    },
  },
};

export default plugin;
