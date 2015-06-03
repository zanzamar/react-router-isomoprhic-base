var path = require( 'path' ),
	webpack = require( 'webpack' );

module.exports = {
	entry: "./app/client",

	output: {
		filename: '[name].js',
		chunkFilename: '[id].chunk.js',
		path: path.join('build', 'js'),
		publicPath: '/js/'
	},

	module: {
		loaders: [
			{
				test: /\.(js|jsx)?$/,
				loaders: [ 'babel' ],
				exclude: /node_modules/
			}
		]
	}
};
