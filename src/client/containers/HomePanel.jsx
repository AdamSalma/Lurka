import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Link } from "react-router";

import Velocity from 'velocity-animate';

import Header from "../components/Header";

import {
	toggleHeaderAnimation,
	changeProvider
} from '../actions/HeaderActions';

// import scroll action here

class HomePanel extends React.Component {
	constructor() {
		super();
		this.scrollToContent = this.scrollToContent.bind(this);
		this.onProviderClick = this.onProviderClick.bind(this);
		this.state = {scrollCount: 60};
	}

	// componentDidMount() {
	// 	window.addEventListener('scroll', (event) => this.handleScroll(event), false)
	// }

	// componentWillUnmount() {
	// 	window.removeEventListener('scroll', () => console.log('Removed window.scroll event'), false)
	// }

    render() {
		const {isMainPage, providers, loadingText} = this.props;
        return (
        	<div id="pages">
	            <div className="page page-home">
	        		{/* TODO: add text prop for logo loading animation e.g. "Fetching thread..."*/}
	            	<Header loadingText={loadingText} isMainPage={isMainPage}/>  
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
    	console.log("onProviderClick");
    	this.props.toggleHeaderAnimation();
    	this.scrollToContent();
    }

    scrollToContent() { // TODO: add logo spin actions, make own component, move isFetching to state.status
    	console.log("scrollToContent");
    	const $page = $('#pages');
    	let offset = 0;

    	if (this.props.isMainPage) {
    		 offset = window.innerHeight;
    	}

    	Velocity(document.body, 'scroll', {offset: offset, duration: 1000});    	
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
        toggleHeaderAnimation,
        changeProvider
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePanel)