/*-------------------------------------------------------------------------------------------------------------------*\
|
| Enables the serving of isomorphic react.
|
\*-------------------------------------------------------------------------------------------------------------------*/
'use strict';

var React = require( 'react' ),
	Router = require( 'react-router' ),
	getRoutes = require( '../app/routes.js' ),
	Path = require( 'path' );

var fetchData = require( '../app/utils/fetchData' );
var cache = require( '../app/utils/cache' );

var fs = require( 'fs' );
var layoutHTML = fs.readFileSync( Path.join( __dirname, '../app/layout.html' ) ).toString();

var renderApp = ( req, res, next, callback ) => {
	var htmlRegex = /¡HTML!/;
	var dataRegex = /¡DATA!/;

	var token = 'TODO-CHANGE-TOKEN';

	var router = Router.create({
		routes: getRoutes( token ),
		location: req.url,
		onAbort: function( redirect ) {
			callback({ redirect });
		},
		onError: function( err ) {
			console.log( 'Routing Error' );
			console.log( err );
		}
	});

	router.run(( Handler, state ) => {
		if ( state.routes[ 0 ].name === 'not-found' ) {
			let html = React.renderToStaticMarkup( <Handler /> );
			return callback({ notFound: true }, html );
		} else {
			fetchData( token, state ).then(( data ) => {
				let clientData = { token, data: cache.clean( token ) };
				let html = React.renderToString( <Handler data={data} /> );
				let output = layoutHTML
					.replace( htmlRegex, html )
					.replace( dataRegex, JSON.stringify( clientData ) );
				callback( null, output );
			});
		}
	});
};

module.exports = function( req, res, next ) {
	renderApp( req, res, next, ( error, html ) => {
		if ( !error ) {
			res
				.set( 'Content-Type', 'text/html' )
				.send( html );
		} else if ( error.redirect ) {
			res.redirect( 303, error.redirect.to );
		} else if ( error.notFound ) {
			res
				.status( 404 )
				.set( 'Content-Type', 'text/html' )
				.send( html );
		}
	});
};
