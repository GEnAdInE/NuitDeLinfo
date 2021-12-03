module.exports = {
  module: {
    rules: [
      {
        test: /\.mp4$/,
        use: 'file-loader',
        loader: 'file-loader?name=videos/[name].[ext]',
      },
    ],
  },
};
