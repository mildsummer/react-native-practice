const icomoon = require('icomoon-cli');
const glob = require('glob');

const fileNames = glob.sync('src/assets/fonts/_icons/*.svg');

console.log(fileNames);
icomoon({
  icons: fileNames,
  names: fileNames.map((fileName) => (fileName.match(/([^\/]+)\.svg/))[1]),
  outputDir: '/src/assets/fonts',
  forceOverride: true,
  whenFinished (result) {
    // you can get the absolute path of output directory via result.outputDir
  }
});
