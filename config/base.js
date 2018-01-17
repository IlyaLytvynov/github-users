const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require("path");

const baseConf = (_path) => {
    const dependecies = Object.keys(require(path.normalize(_path + '/package')).dependencies);
    const htmlSrc = path.normalize(_path + "/src/index.html");

    const entry = {
        application: path.normalize(_path + "/src/index"),
        vendors: path.normalize(_path + "/src/vendors")
    };


    return {
        entry,
        output: {
            filename: "[name].js",
        },
        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".ts", ".tsx", ".js", ".json"]
        },
        module: {
            rules: [
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader'
                        }
                    ]
                },
                {
                    test: /\.ts|\.tsx$/,
                    exclude: /(node_modules)/,
                    enforce: 'pre',
                    use: [
                        {
                            loader: 'awesome-typescript-loader'
                        },
                        {
                            loader: 'tslint-loader'
                        }
                    ]
                },
                {
                    test: /\.less/,
                    loader: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'autoprefixer-loader?browsers=last 5 version', 'less-loader']
                    })
                },
                {

                    /**
                     * ASSET LOADER
                     * Reference: https://github.com/webpack/file-loader
                     * Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
                     * Rename the file using the asset hash
                     * Pass along the updated reference to your code
                     * You can add here any file extension you want to get copied to your output
                     */
                    test: /\.(png|jpg|jpeg|gif|svg)$/,
                    loader: 'file-loader?name=assets/images/[name].[ext]'
                },
                {
                    test: /\.(eot|ttf|woff|woff2)$/,
                    loader: 'file-loader?name=assets/fonts/[name].[ext]'
                }
            ]
        },

        // When importing a module whose path matches one of the following, just
        // assume a corresponding global variable exists and use that instead.
        // This is important because it allows us to avoid bundling all of our
        // dependencies, which allows browsers to cache those libraries between builds.
        externals: {
            // "react": "React",
            // "react-dom": "ReactDOM"
        },

        plugins: [
            new ExtractTextPlugin({
                filename: 'styles.css',
                disable: false,
                allChunks: true
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendors',
            }),
            new HtmlWebpackPlugin({
                template: htmlSrc
            }),
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
                VERSION: JSON.stringify("5fa3b9"),
                BROWSER_SUPPORTS_HTML5: true,
                "typeof window": JSON.stringify("object"),
            })
        ]
    };
};

module.exports = baseConf;