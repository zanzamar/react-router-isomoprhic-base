/*-------------------------------------------------------------------------------------------------------------------*\
|
| Base server file for setting up an Express/React app.
|
\*-------------------------------------------------------------------------------------------------------------------*/
'use strict';

var express = require( 'express' ),
	config = require( 'config' ),
	session = require( 'client-sessions' ),
	favicon = require( 'serve-favicon' ),
	Path = require( 'path' ),
	compression = require( 'compression' ),
	babelRegister = require( 'babel/register' ),
	debug = require( 'debug' )( 'server:info' );

if ( !process.env.NODE_ENV ) {
	process.env.NODE_ENV = 'development';
}


debug( 'NODE_ENV: [' + process.env.NODE_ENV + ']' );
debug( 'Starting Express Server' );
debug( 'Config:' );
debug( config );

require('node-jsx').install();
babelRegister( config.babel );

var app = module.exports = express();
app
	.use( session( config.session ) )
	.use( compression() )
	.use( '/assets', express.static( Path.join( __dirname, '../', '/app/assets/' ), config.serveStatic ) )
	.use( '/', express.static( Path.join( __dirname, '../', '/build/' ), config.serveStatic ) )
	.use( favicon( Path.join( __dirname, '../', '/app/assets/favicon.ico' ) ) )
	.use( '/', require( './isomorphicReact' ) )
	.listen( config.port, function() {
		debug( 'Listening on port %d', config.port );
		if ( process.send ) {
			process.send( 'online' );
		}
	});
