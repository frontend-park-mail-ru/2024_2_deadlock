module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          esmodules: true,
        },
        bugfixes: true,
      },
    ],
    '@babel/preset-typescript',
  ],
};
