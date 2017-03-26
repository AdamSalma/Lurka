import React, { Component } from "react";
import classes from "classnames";

import {clearState} from '~/store/localStorage'
import {
    LogoText,
    Icon,
    SearchBox,
    Hierarchy,
    HeaderItem
} from "~/components"

import {bindMembersToClass, findParentWithClass} from '~/utils'

const HeaderIcon = ({name, onClick, active, ...restProps}) => {
    return (
        <HeaderItem 
        className={classes("header-icon", {"active": active})} 
        onClick={onClick} {...restProps}>
            <Icon name={name}/>
        </HeaderItem>
    )
}

export default class Header extends Component {
    constructor(props) {
        super(props);
        bindMembersToClass(this, 
            'handleKeyUp',
            'toggleActive',
            'handleIconClick'
        )
    }

    render() {
        const { 
            // Actions
            scrollHeader, closeThread, toggleNavbar, toggleHeaderPanel,
            //State
            threadIsActive, 
            provider, 
            boardID, 
            threadID, 
            activePanel, 
            isNavbarOpen 
        } = this.props;

        const placeholder = `Search ${threadIsActive ? "thread" : "board"} ...`

        return (
            <div id="header" className="header">
                <div className="header-background"/>
                <div className='header-content'>
                    <HeaderIcon name="menu" 
                        active={isNavbarOpen}
                        onClick={toggleNavbar}
                    />

                    <HeaderItem className="version" onClick={clearState}>
                        <LogoText />
                    </HeaderItem>
                    <HeaderItem className="breadcrumb">
                        <Hierarchy provider={provider} boardID={boardID} threadID={threadID}/>
                    </HeaderItem>
                    <HeaderItem className="searchbox">
                        <SearchBox placeholder={placeholder} onKeyUp={this.handleKeyUp}/>
                    </HeaderItem>

                    <HeaderIcon name="eye" 
                        onClick={this.handleIconClick.bind(null, 'watch')}
                        active={activePanel === 'watch'}
                    />
                    <HeaderIcon name="archive" 
                        onClick={this.handleIconClick.bind(null, 'archive')}
                        active={activePanel === 'archive'}
                    />
                    <HeaderIcon name="filter" 
                        onClick={this.handleIconClick.bind(null, 'filter')}
                        active={activePanel === 'filter'}
                    />
                    <HeaderIcon name="sort" 
                        onClick={this.handleIconClick.bind(null, 'sort')}
                        active={activePanel === 'sort'}
                    />
                </div>
            </div>
        )  // TODO: Add filter functionality + buttons
    }

    handleKeyUp(event) {
        this.props.searchBoard(event.target.value)
    }

    handleIconClick(panel) {
        console.log('handleIconClick()')
        this.props.toggleHeaderPanel({panel})
    }

    toggleActive(e) {
        console.log('toggling active')
        findParentWithClass(e.target, 'header-item').classList.toggle('active')
    }
}



