"use strict";
const proxy = require("./proxy.config");

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const WebpackOnBuildPlugin = require('on-build-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AotPlugin = require('@ngtools/webpack').AotPlugin;

const fse = require('fs-extra');

const ENV = process.env.npm_lifecycle_event ? process.env.npm_lifecycle_event : '';
const isStatic = ENV === 'serve';
const isHmr = ENV === 'hmr';
const isProd = ENV === 'prod';
const isTest = ENV === 'test';
const isAot = ENV.includes('aot');
const isProdServer = ENV.includes('prodServer');



module.exports = function makeWebpackConfig() {

    console.log(`You are in ${ENV} mode`);

    let config = {};

    if (isProdServer) {
        if (!fs.existsSync('./dist')) {
            throw "Can't find ./dist, please use 'npm run prod' to get it.";
        }
    }

    if (isHmr || isStatic) {
        config.devtool = 'inline-source-map';
    } else {
        config.devtool = 'source-map';
    }

    config.entry = {
        'ng-app': './src/app/ng-main.ts'
    };

    if (isAot) {
        config.entry['ng-app'] = './src/app/ng-main-aot.ts';
    }

    config.output = isTest ? {} : {
        path: root('./dist/js/'),
        publicPath: '/js/',
        filename: '[name].js',
        chunkFilename: '[id].js'
    };

    if (isProdServer) {
        config.entry = {
            'server': './webpack-prod-server.js'
        };
        config.output = {};
    }

    config.resolve = {
        extensions: ['.ts', '.js', '.json', '.html', '.scss', '.svg']
    };

    config.module = {
        rules: [
            {
                test: /\.ts$/,
                use: isAot ? [{loader: '@ngtools/webpack'}] : [
                    {
                        loader: 'awesome-typescript-loader?'
                    },
                    {
                        loader: 'angular2-template-loader'
                    },
                    {
                        loader: 'angular-router-loader'
                    }
                ].concat(isHmr ? '@angularclass/hmr-loader?pretty=' + !isProd + '&prod=' + isProd : []),
                exclude: [/\.(spec|e2e|d)\.ts$/]
            },
            {
                test: /\.html$/, loader: 'raw-loader',
                exclude: [/node_modules\/(?!(ng2-.+))/, root('src/index.html')]
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?name=[name].[ext]&limit=10000&useRelativePath=true"
            },
            {
                test: /\.scss$/,
                use: [
                    {loader: "css-to-string-loader"},
                    {loader: "css-loader"},
                    {loader: "postcss-loader"},
                    {loader: "sass-loader"}
                ]
            }
        ]
    };



    if (isTest) {
        config.module.rules.push({
            test: /\.ts$/,
            enforce: "post",
            include: path.resolve("src"),
            loader: "istanbul-instrumenter-loader",
            exclude: [/\.spec\.ts$/, /\.e2e\.ts$/, /node_modules/]
        });
    }



    if (!isTest) {
        config.plugins = [
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    'STATIC': isStatic,
                    'HMR': isHmr,
                    'PROD': isProd,
                    'AOT': isAot
                }
            }),
            new WebpackOnBuildPlugin((stats) => {
                console.log('build is done');
            })
        ]
            .concat(isHmr ? new webpack.HotModuleReplacementPlugin() : []);
    }



    if (isAot) {
        config.plugins = [
            new AotPlugin({
                tsConfigPath: './tsconfig.json',
                entryModule: root('src/app/app.module.ts#AppModule')
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    screw_ie8: true,
                    conditionals: true,
                    unused: true,
                    comparisons: true,
                    sequences: true,
                    dead_code: true,
                    evaluate: true,
                    if_return: true,
                    join_vars: true
                },
                output: {
                    comments: false
                },
                sourceMap: true
            }),
            new CopyWebpackPlugin([
                {from: 'index.html', to:'../', context: './src'},
                {from: 'images/**/*', context: './src/assets/themes/base', to: '../assets'},
                {from: 'fonts/**/*', context: './src/assets/themes/base', to: '../assets'}
            ]),
            new WebpackOnBuildPlugin((stats) => {
                const publicPath = root('../../../public');
                // Files
                fse.copy(root('./dist/assets'), publicPath + '/assets');
                fse.copy(root('./dist/js'), publicPath + '/js');
                // fse.remove(root(publicPath + '/');

                console.log('build in aot is done');
            }),
            /*new webpack.optimize.CommonsChunkPlugin({
                name: 'common' // Specify the common bundle's name.
            })*/
        ];

        config.stats = {
            assets: true,
            chunks: false,
            children: false,
            errors: true,
            errorDetails: true,
            timings: true,
            warnings: true
        };
    }



    config.devServer = {
        // contentBase: isProdServer ? "./dist" : "./src",
        contentBase: ["./src", "./dist"],
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
        allowedHosts: [
            'steamlease.dev'
        ],
        proxy: proxy,
        historyApiFallback: true,
        compress: true,
        quiet: false,
        inline: isHmr || isStatic || isProdServer,
        hot: isHmr,
        stats: "minimal",
        port: 9000,
        overlay: {
            errors: true
        },
        clientLogLevel: "none",
        watchOptions: {
            aggregateTimeout: 50,
            ignored: /node_modules/
        }
    };

    return config;
};



function root(__path = '.') {
    return path.join(__dirname, __path);
}
