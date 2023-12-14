import path from 'path';

export default {
  entry: {
    background: './src/js/background.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(new URL('.', import.meta.url).pathname, 'dist/js'),
  },
};
