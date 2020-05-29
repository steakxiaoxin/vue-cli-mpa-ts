module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],
      // rootValue: 16,
      // unitPrecision: 5,
      // propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
      // selectorBlackList: [],
      // replace: true,
      // mediaQuery: false,
      // minPixelValue: 0,
      // exclude: /node_modules/i
    },
  },
}
