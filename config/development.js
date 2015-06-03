module.exports = {
	environment: 'development',
	serveStatic: {
		maxAge: 0
	},
	webpack: {
		port: 7722,
		domainName: 'localhost',
		contentBase: 'http://localhost:7722',
		publicPath: '',
		hot: true,
		stats: {
			colors: true
		},
		historyApiFallback: true
	}
};
