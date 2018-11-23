const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path')


console.log("#Webpack.config.js#");

const cssLoaders =
    [
        {
            loader: "css-loader", options: { importLoaders : 1 , minimize : true }
        }

    ]


module.exports =
    {
        mode: "production",

        entry: ["./main.tsx"],

        output:
            {
                filename: "bundle.js",
                path: path.resolve(__dirname,"out/"),
                //Le path construit sur l'url
                publicPath: "/"
            },


        devServer:
            {
                overlay : true ,
                historyApiFallback: true,
                port: 5000 ,
                contentBase: "./out" ,
                publicPath: "/",
                hot: true,
                inline: true


            },

        plugins: [
            // load `moment/locale/ja.js` and `moment/locale/it.js`
            new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /fr|en/),
            new webpack.SourceMapDevToolPlugin({
                filename: "[file].map"
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css'
                // ,disable: dev
            }),
            new webpack.HotModuleReplacementPlugin()


        ],

        module:
            {
                rules:
                    [
                        {
                            test: /\.tsx$/,
                            exclude: /(node_modules|bower_components)/,
                            loader: "awesome-typescript-loader?configFileName=tsconfig.json"
                        }

                        ,
                        {
                            test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
                            loader: 'url-loader?limit=30000&name=assets/[name]-[hash].[ext]'
                        }
                        ,

                        {
                            test: /\.css$/ ,
                            use: [{ loader: MiniCssExtractPlugin.loader}, "css-loader" ]

                        }



                    ]
            },

        resolve:
            {
                extensions: [".js", ".json", ".ts", ".tsx",".jsx"],
                alias:
                    {
                        '@frontend' : path.resolve("./")
                    }

            }
    };
