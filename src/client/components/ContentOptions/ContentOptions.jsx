import React from 'react';
import classNames from 'classnames';

import Dropdown from '../Dropdown';

export default class ContentOptions extends React.Component {
    constructor({provider, fetchBoardList}) {
        super()
        fetchBoardList({provider});
        this.handleDropdown = this.handleDropdown.bind(this)
    }

    render() {
        const { provider, fetchBoardList, boardList, isFetching } = this.props;
        
        const classes = classNames("content-options")  // TODO - add to this

        return (
            <div id="content-options" className={classes}>
            	<ul className="icons">
                    <li>
                        <i className="fa fa-cog"></i> 
                        <span>Content Options</span>
                    </li>
                    <li>
                        <i className="fa fa-cog"></i>
                        <span>Scraper Mode</span>
                    </li>
                    <li>
                        <i className="fa fa-cog"></i>
                        <span>Settings</span>
                    </li>
            	</ul>
                <Dropdown items={boardList} handleClick={this.handleDropdown}/>
            </div>
        )

    }

    handleDropdown( boardID ) {
        const { provider, fetchBoard } = this.props;
        fetchBoard({boardID, provider})
    } 
}