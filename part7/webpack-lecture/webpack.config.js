const path = require('path')
const webpack = require('webpack')

//entry: mistä bundlaus aloitetaan
//output: minne muodostettu bundle sijoitetaan
//kohdehakemisto: määritellään absoluuttisena polkuna metodin path.resolve -avulla
//__dirname: Noden globaali muuttuja, viittaa nykyiseen hakemistoon
//module: rules: loaderit, kerrotaan webpackille miten tiedostot tulee käsitellä ennen bundlausta
//yksittäinen loader:
//test: määrittelee, että käsitellään .js-päätteisiä tiedostoja
//loader: käsittely tapahtuu babel-loaderilla
//query: toimintaa ohjaavat parametrit

//parametrit env ja argv, joista jälkimmäinen sisältää npm-skriptin moden
const config = (env, argv) => {
    const backend_url = argv.mode === 'production' ? 'https://radiant-plateu-25399.herokuapp.com/api/notes' : 'http://localhost:3002/notes'
    return {
        entry: ['@babel/polyfill','./src/index.js'],
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'main.js'
        },
        devServer: {
            contentBase: path.resolve(__dirname, 'build'),
            compress: true,
            port: 3000,
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/preset-env','@babel/preset-react']
                    }
                },
                {
                    test: /\.css$/,
                    loaders: ['style-loader', 'css-loader'],
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                BACKEND_URL: JSON.stringify(backend_url)
            })
        ]
    }
}

module.exports = config