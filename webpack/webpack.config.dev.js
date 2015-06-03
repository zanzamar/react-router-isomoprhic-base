var Path = require( 'path' ),
	webpack = require( 'webpack' ),
	config = require( 'config' );

module.exports = {

	devtool: 'eval',

	entry: [
		'webpack-dev-server/client?' + config.webpack.contentBase,
		'webpack/hot/only-dev-server',
		'./app/client'
	],

	output: {
		filename: '[name].js',
		chunkFilename: '[id].chunk.js',
		path: Path.join( __dirname, '../', 'build', 'js'),
		publicPath: '/build/js/'
	},

	module: {
		loaders: [
			{
				test: /\.(js|jsx)?$/,
				loaders: [
					'react-hot',
					'babel'
				],
				exclude: /node_modules/
			}
		]
	},

	resolve: {
		extensions: [ '', '.js', '.jsx' ]
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]
};
