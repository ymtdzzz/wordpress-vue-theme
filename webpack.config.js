const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'scripts/[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "img/[name].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "fonts/[name].[ext]"
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            vue$: "vue/dist/vue.esm.js"
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        // new webpack.ProvidePlugin({
        //     throttle: "lodash.throttle"
        // }),
        // new webpack.optimize.UglifyJsPlugin({
        //     include: /\.min\.bundle\.js$/,
        //     minimize: true,
        //     ecma: 8
        // }),
        // new webpack.LoaderOptionsPlugin({ minimize: true }),
        new ExtractTextPlugin("styles.css")
    ]
}