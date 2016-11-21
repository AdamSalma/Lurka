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
			scrollPage, fetchBoard, fetchBoardList,
			status, boardlist, threadIsActive
		} = this.props;
        return (
        	<div id="pages">
	            <div className="page page-home">
	            	<Header 
                        scrollPage={scrollPage} fetchBoardList={fetchBoardList} fetchBoard={fetchBoard}
	                    statusMessage={status.statusMessage} boardList={boardlist} provider={status.provider}
                        boardID={status.boardID} threadID={status.threadID} threadIsActive={threadIsActive}
	           		/>  
	            	<div>
	            		<h3>Providers:</h3>
	            		<div className="providers">
	            		{this.renderProviders(status.providers)}
	            		</div>
	            	</div>
	            </div>
	            {this.props.children}
	        </div>
        )
    }

    renderProviders( providers ) {
        console.warn("Rendering providers out... " + providers)
        return providers.map( 
            provider => <Link key={provider} to="/content">
                <input 
                    type="button" 
                    value={provider} 
                    onClick={()=>this.onProviderClick(provider)}/>
            </Link>
        )

    }

    onProviderClick(provider) {
    	const {scrollPage, changeProvider} = this.props;
        // TODO: be able to change provider and board
        changeProvider(provider)
        scrollPage({content: true})
    	
    }
}

function mapStateToProps({status, boardlist, thread}) {
    return {
        status,
        boardlist,
        threadIsActive: thread.isActive
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