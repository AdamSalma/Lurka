import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Link } from "react-router";

import Velocity from 'velocity-animate';

import Header from "../components/Header";

import {
	changeProvider
} from '../actions/HeaderActions';

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
		const {isMainPage, providers, loadingText, expandHeader, scrollPage} = this.props;
        return (
        	<div id="pages">
	            <div className="page page-home">
	        		{/* TODO: add text prop for logo loading animation e.g. "Fetching thread..."*/}
	            	<Header loadingText={loadingText} isMainPage={isMainPage} expandHeader={expandHeader} scrollPage={scrollPage}/>  
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

function mapStateToProps({status, header}) {
    return {
        provider: status.provider,
        providers: status.providers,
        isMainPage: header.isMainPage,
        loadingText: header.loadingText
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