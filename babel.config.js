module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
      "plugins": [
        ["module:react-native-dotenv"]
      ]
  };
};

/* DOC PLUGINS ***********************************************************************
  https://www.npmjs.com/package/react-native-dotenv
******************************************************************************/
