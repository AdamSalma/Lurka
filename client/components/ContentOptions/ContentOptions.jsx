import React from 'react';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchBoardList } from '../../actions/board.actions';

class ContentOptions extends React.Component {
    render() {
        const { provider, toggleMenu } = this.props;
        return (        	
            <div className="content-options">
            	<div className="icons">
            		<i className="fa fa-bars" aria-hidden="true" onClick={toggleMenu}></i>
            	</div>
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