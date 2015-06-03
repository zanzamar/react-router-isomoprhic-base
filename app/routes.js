'use strict';
var React = require('react');
var { DefaultRoute, Route, NotFoundRoute } = require('react-router');
var Root = require( './components/Root' );
var Home = require( './components/Home' );
var Contact = require( './components/Contact' );
var NewContact = require( './components/NewContact' );
var NotFound = require( './components/NotFound' );

module.exports = ( token ) => {

	// hand-wavy dependency injection
	var CreateContact = require('./components/CreateContact');
	CreateContact.token = token;

	return [
		<Route name="root" path="/" handler={Root}>
			<DefaultRoute handler={Home} />
			<Route name="contact" path="contact/:id" handler={Contact} />
			<Route name="newContact" handler={NewContact} />
			<Route name="createContact" handler={CreateContact} />
		</Route>,
		<NotFoundRoute name="not-found" handler={NotFound}/>
	];
};
