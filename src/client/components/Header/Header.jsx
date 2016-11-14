import React, { Component } from "react";

import Velocity from 'velocity-animate';
import classNames from "classnames";

import Logo from "../Logo";
import ContentOptions from "../ContentOptions";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.createOptions = this.createOptions.bind(this)
    }
    render() {
        const {
            isMainPage, loadingMessage, scrollPage
        } = this.props;

        console.info(`isMainPage in Header? ${isMainPage}`)
        return (
            <div id="header" className="header">
                <div className="header-content">
                    <Logo isFullsize={isMainPage} loadingMessage={loadingMessage} scrollPage={scrollPage}/>
                    {this.createOptions(isMainPage)}
                </div>
            </div>
        )
    }

    createOptions( isMainPage ) {
        const {boardList, fetchBoardList, provider, fetchBoard} = this.props
        return <ContentOptions 
            provider={provider} 
            boardList={boardList} 
            fetchBoard={fetchBoard}
            fetchBoardList={fetchBoardList}
        />

    }
}


