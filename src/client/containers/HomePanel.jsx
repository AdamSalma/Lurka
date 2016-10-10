import React from "react";
import { Link } from "react-router";

import Header from "../components/Header";

// import scroll action here

export default class HomePanel extends React.Component {
	constructor() {
		super()
		this.handleScroll = this.handleScroll.bind(this);
		this.state = {scrollCount: 60}
	}

	componentDidMount() {
		window.addEventListener('scroll', (event) => this.handleScroll(event), false)
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', () => console.log('Removed window.scroll event'), false)
	}

    render() {
		const providers = ["4chan", "reddit"]  // this.props.providers eventually
		
        return (
        	<div id="pages">
	            <div className="page page-home">
	        		{/* TODO: add text prop for logo loading animation e.g. "Fetching thread..."*/}
	            	<Header loadingText={"loadingText"} isMainPage={true}/>  
	            	<div>
	            		<h3>Providers:</h3>
	            		<div className="providers">
	            		{
	            			providers.map( 
	            				provider => <Link key={provider} to="content">
			            			<input 
										type="button" 
										value={provider} 
										onClick={this.scrollToContent}/>
		            			</Link>
							)
						}
	            		</div>
	            	</div>
	            </div>
	            {this.props.children}
	        </div>
        )
    }

    handleScroll() { // TODO: add logo spin actions, make own component, move isFetching to state.status
    	if (this.state.scrollCount++ < 60) return;
    	this.state.scrollCount = 0
    	
    	if (!this.state.logoImg) {
    		this.state.logoImg = document.querySelector('#logo');
    	}

    	let classList = this.state.logoImg.classList;
    	let isFullsize = false

    	for (let i=0; i < classList.length; i++ ){
    		if (classList[i] === 'logo-fullsize') {
    			isFullsize = true
    			break
    		}
    	}

    	console.log(this.state.logoImg.classList)

    	if (isFullsize) {
    		classList.remove('logo-fullsize');
    		classList.add('logo-shrunk');
    	} else {
    		classList.add('logo-fullsize');
    		classList.remove('logo-shrunk');
    	}
    }
}
