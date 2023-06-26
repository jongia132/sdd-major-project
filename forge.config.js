module.exports = {
  packagerConfig: {
    asar: false,
    "ignore": [
      "^(\/node_modules$)",
      "^(\/out$)",
      "tsconfig.json",
      ".gitignore",
      "^(\/.vscode$)",
      "^(\/.yarn$)",
      ".yarnrc.yml",
      ".forge.config.js",
      "tsconfig.json",
      "vite.config.ts",
      "^(\/src$$)"
    ]
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    // {
    //   name: '@electron-forge/plugin-auto-unpack-natives',
    //   config: {},
    // },
  ],
};
