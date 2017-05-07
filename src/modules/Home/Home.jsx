import './Home.styles'
import React, { Component, PropTypes } from "react";
import classes from 'classnames'

import Toolbar from './Toolbar'
import Card from './Card'
import {bindMembersToClass} from '~/utils'

const settings = window.appSettings

class Home extends Component {
    constructor(props) {
        super(props);
        bindMembersToClass(this, 'handleCardClick')
        this.state = {
            currentBoard: props.currentBoard
        }
    }

    render() {
        const {boardList:{items}} = this.props;
        return (
            <div className="Home">
                <Toolbar />
                {items && items.map( board =>
                    <Card key={board.boardID}
                        title={board.boardID}
                        description={board.short_desc}
                        info={board.info}
                        isActive={board.boardID === this.state.currentBoard}
                        onClick={this.handleCardClick.bind(null, board.boardID)}
                    />
                )}
            </div>
        );
    }

    handleCardClick(boardID) {
        this.props.fetchBoard(boardID)
    }
}

export default Home
