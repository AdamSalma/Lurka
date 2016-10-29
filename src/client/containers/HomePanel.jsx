import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Link } from "react-router";

import Velocity from 'velocity-animate';

import Header from "../components/Header";

import {
	changeProvider
} from '../actions/StatusActions';

import {
	scrollPage,
	shrinkHeader,
	expandHeader
} from '../actions/AnimationActions';

// import scroll action here

class HomePanel extends Component {
	constructor() {
		super();
		this.onProviderClick = this.onProviderClick.bind(this);
		this.state = {scrollCount: 60};
	}

    render() {
		const {isMainPage, providers, loadingMessage, expandHeader, scrollPage} = this.props;
        return (
        	<div id="pages">
	            <div className="page page-home">
	            	<Header loadingMessage={loadingMessage} isMainPage={isMainPage} expandHeader={expandHeader} scrollPage={scrollPage}/>  
	            	<div>
	            		<h3>Providers:</h3>
	            		<div className="providers">
	            		{providers.map( 
            				provider => <Link key={provider} to="/content">
		            			<input 
									type="button" 
									value={provider} 
									onClick={this.onProviderClick}/>
	            			</Link>
						)}
	            		</div>
	            	</div>
	            </div>
	            {this.props.children}
	        </div>
        )
    }

    onProviderClick() {
    	const {scrollPage, shrinkHeader} = this.props;
    	
    	shrinkHeader();
    	scrollPage({content: true})
    	
    }
}

function mapStateToProps({status, content}) {
    return {
        provider: content.provider,
        providers: status.providers,
        isMainPage: status.isMainPage,
        loadingMessage: status.loadingMessage
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeProvider,
        scrollPage,
        shrinkHeader,
        expandHeader
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePanel)