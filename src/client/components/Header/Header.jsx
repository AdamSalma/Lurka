import React, { Component } from "react";

import Velocity from 'velocity-animate';
import classNames from "classnames";

import Logo from "../Logo";
import ContentOptions from "../ContentOptions";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.onHeaderExpand = this.onHeaderExpand.bind(this)
        this.createOptions = this.createOptions.bind(this)
    }
    render() {
        const {
            isMainPage, loadingMessage, expandHeader, scrollPage
        } = this.props;

        console.info(`isMainPage in Header? ${isMainPage}`)
        return (
            <div id="header">
                <Logo isFullsize={isMainPage} loadingMessage={loadingMessage} expandHeader={this.onHeaderExpand}/>
                {this.createOptions( isMainPage )}
            </div>
        )
    }

    createOptions( isMainPage ) {
        const {boardList, fetchBoardList, provider, fetchBoard} = this.props
        if (!isMainPage)
            return <ContentOptions 
                        provider={provider} 
                        boardList={boardList} 
                        fetchBoard={fetchBoard}
                        fetchBoardList={fetchBoardList}/>

    }

    onHeaderExpand() {
        // TODO - check if on contentpage else return
        const {scrollPage, expandHeader} = this.props;
        expandHeader()
        scrollPage({mainPage:true})
    }
}


