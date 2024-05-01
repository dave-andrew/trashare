module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "nativewind/babel",
      ["react-native-worklets-core/plugin"],
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@models': './models',
            '@components': './component',
            '@provider': './app/providers',
            '@assets': './assets',
          }
        }
      ]
    ]
  };
};
