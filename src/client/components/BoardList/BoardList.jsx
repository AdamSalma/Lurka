import React, { Component } from "react";

import classNames from 'classnames';
import uuid from 'uuid';

import Dropdown from '../Dropdown';
import SearchBox from '../SearchBox';

export default class BoardList extends Component {
    constructor({boardList, provider, fetchBoardList}) {
        super()
        this.handleKeyUp = this.handleKeyUp.bind(this)
        this.renderBoardList = this.renderBoardList.bind(this)

        this.state = {
            keyword: ''
        }

        if (!boardList) {
            fetchBoardList(provider);
        }
    }

    render() {
        const {boardList} = this.props
        const hasBoards = boardList && boardList.length;

        return hasBoards ? this.renderBoardList() : false
    }


    renderBoardList() {
        const { boardList, provider, handleClick } = this.props;
        return (
            <div className={`board-list ${provider}`} 
                 onClick={this.toggleBoardList}
            >
                <span className="placeholder">{provider}</span>
                <div className="content">
                    <SearchBox
                        className="search"
                        onKeyUp={this.handleKeyUp}
                        placeholder={`Search ${provider}`}
                    />
                    <Dropdown 
                        className={provider}
                        items={this.renderDropdownChildren(boardList)}
                        handleClick={handleClick}
                    />
                </div>
            </div>
        )
    }
    

    handleKeyUp(event) {
        this.setState({
            keyword: event.target.value.toLowerCase()
        })
    }

    toggleBoardList(event) {
        console.log("clicked on boardlist");
        $(event.target).closest('.board-list').toggleClass('bl-active')
    }

    renderDropdownChildren(boardList) {

        const boards = boardList.filter( 
            ({description}) => 
                description.toLowerCase().includes(this.state.keyword)
        )
        return boards.map( ({boardID, description}) => (
            <div key={uuid.v4()} data-value={boardID}>
                {description}
            </div>
        ));
    }

}