import React from 'react';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchBoardList } from '../../actions/board.actions';

import BoardList from '../BoardList'

class ContentOptions extends React.Component {
    componentWillMount() {
        if (!this.props.boardList) {
            this.props.fetchBoardList({
                provider: '4chan',
                boardID: 'g'
            });
        }
    }

    render() {
        console.warn('ContentOptions');
        const { provider, toggleMenu, menuIsOpen, fetchBoardList, boardList } = this.props;

        if (!boardList) fetchBoardList(provider);

        const classes = classNames("content-options", {
            "content-options-visible": menuIsOpen
        })

        return (        	
            <div id="content-options" className={classes}>
            	<ul className="icons">
                    <li>
                        <i className="fa fa-cog" onClick={toggleMenu}></i> 
                        <span>Content Options</span>
                    </li>
                    <li>
                        <i className="fa fa-cog" onClick={toggleMenu}></i>
                        <span>Scraper Mode</span>
                    </li>
                    <li>
                        <i className="fa fa-cog" onClick={toggleMenu}></i>
                        <span>Settings</span>
                    </li>
            	</ul>
            </div>
        )
    }
}


function mapStateToProps(state) {
    console.log("Mapping state to props. state:", state);

    return {
        boardList: state.board.boardList
    }
}

function mapDispatchToProps(dispatch) {
    console.log("dispatching board action");

    return bindActionCreators({fetchBoardList}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentOptions)