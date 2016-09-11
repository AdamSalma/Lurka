import React from 'react';
import classNames from 'classnames';

export default class Footer extends React.Component {
    render() {
        const { provider, toggleMenu } = this.props;
        return (        	
            <div className="content-options">
            	<div className="icons">
            		<i className="fa fa-bars" aria-hidden="true" onClick={toggleMenu}></i>
            	</div>
            	{() => {if (provider === "chan") return this.renderChan()}}
            </div>
        )
    }

    renderChan
}
