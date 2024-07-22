const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/i, // Resim dosyalarını eşleştir
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]', // Dosya adını koru
                            outputPath: 'images/', // Çıktı dizini
                            publicPath: 'images/', // Sunucu üzerindeki dosya yolunu belirt
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html',
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        historyApiFallback: true,
    },
};