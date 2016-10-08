import React from 'react';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchBoardList, fetchBoard } from '../../actions/board.actions';
import { changeProvider } from '../../actions/provider.actions';

import Dropdown from '../Dropdown';

class ContentOptions extends React.Component {
    constructor({provider, fetchBoardList}) {
        super()
        fetchBoardList({provider});
        this.handleDropdown = this.handleDropdown.bind(this)
    }

    render() {
        const { provider, fetchBoardList, boardList, isFetching } = this.props;

        if (!isFetching && !boardList.length) fetchBoardList(provider);

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


function mapStateToProps(state) {
    return {
        boardList: state.board.boardList,
        boardID: state.status.boardID,
        provider: state.status.provider,
        isFetching: state.board.isFetching
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchBoardList, 
        fetchBoard, 
        changeProvider
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentOptions)