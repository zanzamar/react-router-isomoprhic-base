/*-------------------------------------------------------------------------------------------------------------------*\
|
| Enables the serving of isomorphic react.
|
\*-------------------------------------------------------------------------------------------------------------------*/
'use strict';

var React = require( 'react' ),
	Router = require( 'react-router' ),
	getRoutes = require( '../app/routes.js' ),
	Path = require( 'path' ),
	HtmlDocument = require( './HtmlDocument' );

var fetchData = require( '../app/utils/fetchData' );
var cache = require( '../app/utils/cache' );

function renderApp( req, res, next, callback ) {
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
			callback( { notFound: true }, generateHtmlDocument( Handler ) );
		} else {
			fetchData( token, state ).then(( data ) => {
				callback( null, generateHtmlDocument( Handler, token, data ) );
			});
		}
	});
}

function generateHtmlDocument( Handler, token, data ) {
	let clientData = { token, data: cache.clean( token ) };
	return '<!doctype html>' +
		React.renderToString(
			<HtmlDocument
				title="Isomorphic Example"
				componentHTML={ React.renderToString( <Handler data={data} /> )}
				rehydrateData={ '__DATA__ = ' + JSON.stringify( clientData ) }
			/>
		);
}

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
