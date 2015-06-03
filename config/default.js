module.exports = {
	environment: 'production',
	port: 7721,
	serveStatic: {
		maxAge: 1000 * 60 * 24 * 365 * 10 // 10 years
	},
	babel: {
		optional: [ 'es7.classProperties' ],
		extensions: [ '.es6', '.es', '.jsx', '.js' ]
	},
	session: {
		name: 'sess-id',
		secret: 'FYLatfmeQPKDPbzaRMGixiC7mAoLCeFRyLhkMLtgGuJMDGs7Jo',
		duration: 1000 * 60 * 24 * 365 * 10, // 10 years
		activeDuration: 1000 * 60 * 30 // 30 minutes
	}
};
