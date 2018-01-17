const webpack = require('webpack');


const prod = (config, _path) => {
    console.info("ENV: PROD");

    // const uglify = [new webpack.optimize.UglifyJsPlugin({
    //     compress: {
    //         warnings: false,
    //         drop_console: false,
    //     }
    // })];
    // config.plugins = config.plugins.concat(uglify);
    config.output.path =  _path;

    return config;
};

module.exports = prod;