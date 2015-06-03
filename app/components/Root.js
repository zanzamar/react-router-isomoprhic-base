'use strict';

import React from 'react';
import { Link, RouteHandler } from 'react-router';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import api from '../utils/api';
var twitter = 'http://twitter.com/ryanflorence';
var rr = 'https://github.com/rackt/react-router';
var source = 'https://github.com/rackt/react-router-mega-demo';

var sortContacts = (contacts) => {
	return contacts.slice(0).sort((a, b) => {
		a = (a.first + ' ' + a.last).toLowerCase();
		b = (b.first + ' ' + b.last).toLowerCase();
		return ( a > b ) ? 1 : ( ( a < b ) ? -1 : 0 );
	});
};

class Root extends React.Component {

	constructor( props ) {
		super( props );
		this.state = {
			longLoad: false
		};
	}

	static fetchData( token, params, query ) {
		return api.get( '/contacts', token );
	}

	static propTypes = {
		loadingEvents: React.PropTypes.func,
		data: React.PropTypes.object
	};

	componentDidMount() {
		var timeout;
		this.props.loadingEvents.on('start', () => {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				this.setState({ longLoad: true });
			}, 250);
		});
		this.props.loadingEvents.on('end', () => {
			clearTimeout(timeout);
			this.setState({ longLoad: false });
		});
	}

	renderContacts() {
		return sortContacts(this.props.data.root.contacts).map((contact) => {
			return (
				<li className="ContactList__Contact" key={contact.id}>
					<Link
						className="ContactList__Link"
						to="contact"
						params={{id: contact.id}}
					>
						{contact.first} {contact.last}
					</Link>
				</li>
			);
		});
	}

	render() {
		var className = 'App';
		if ( this.state.longLoad ) {
			className += ' App--loading';
		}
		return (
			<div className={className}>
				<div className="TopBar">
					Made by <a href={twitter}>Ryan Florence</a> with <a href={rr}>React Router</a>. View the <a href={source}>Source Code</a>.
				</div>
				<div className="Master">
					<h2 className="Heading">Contacts</h2>
					<div className="Content">
						<ul className="ContactList">
							<li className="ContactList__Contact" key="__newLink__">
								<Link
									className="ContactList__Link ContactList__Link--new"
									to="newContact"
								>New Contact</Link>
							</li>
							{this.renderContacts()}
						</ul>
					</div>
				</div>

				<TransitionGroup transitionName="detail">
					<RouteHandler {...this.props} />
				</TransitionGroup>
			</div>
		);
	}
}

module.exports = Root;
