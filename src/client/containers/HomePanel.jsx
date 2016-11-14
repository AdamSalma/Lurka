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
	scrollPage
} from '../actions/AnimationActions';

import {
    fetchBoardList, fetchBoard
} from '../actions/BoardActions';

// import scroll action here

class HomePanel extends Component {
	constructor() {
		super();
		this.onProviderClick = this.onProviderClick.bind(this);
	}

    render() {
		const {
			scrollPage, fetchBoard,
			isMainPage, providers, loadingMessage, provider, boardList, fetchBoardList
		} = this.props;
        return (
        	<div id="pages">
	            <div className="page page-home">
	            	<Header 
                        scrollPage={scrollPage} fetchBoardList={fetchBoardList} fetchBoard={fetchBoard}
	            		loadingMessage={loadingMessage} isMainPage={isMainPage} boardList={boardList} provider={provider}
	           		/>  
	            	<div>
	            		<h3>Providers:</h3>
	            		<div className="providers">
	            		{providers.map( 
            				provider => <Link key={provider} to="/content">
		            			<input 
									type="button" 
									value={provider} 
									onClick={()=>this.onProviderClick(provider)}/>
	            			</Link>
						)}
	            		</div>
	            	</div>
	            </div>
	            {this.props.children}
	        </div>
        )
    }

    onProviderClick(provider) {
    	const {scrollPage, changeProvider} = this.props;
        // TODO: be able to change provider and board
        changeProvider(provider)
        scrollPage({content: true})
    	
    }
}

function mapStateToProps({status, content}) {
    return {
        provider: content.provider,
        providers: status.providers,
        isMainPage: status.isMainPage,
        loadingMessage: status.loadingMessage,
        boardList: content.boardlist,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeProvider,
        scrollPage,
        fetchBoardList,
        fetchBoard
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePanel)