import './Drawer.styles';
import React, { Component, PropTypes } from 'react';
import cx from 'classnames'

import {
    SearchBar, LogoText
} from '~/components'

import {
    invokeAfterUninterruptedDelay
} from '~/utils'

import Sort from './Sort'

class Drawer extends Component {
    constructor(props) {
        super(props);
        this.throttleSearch = invokeAfterUninterruptedDelay(200, this.handleSearch)
    }

    componentDidUpdate(prevProps, prevState) {
        const { isDrawerOpen } = this.props

        if (isDrawerOpen && prevProps.isDrawerOpen !== isDrawerOpen) {
            console.warn("Focusing drawer seabox")
            this.SearchBarRef.focus()
        }
    }

    render() {
        const { isThreadOpen, isDrawerOpen } = this.props
        const searchPlaceholder = `Search ${isThreadOpen ? 'thread': 'board'}`

        const drawerClass = cx('Drawer', {
            'is-open': isDrawerOpen,
            'is-closed': !isDrawerOpen
        })

        return (
            <div id="drawer" className={drawerClass}>
                <div className="header">
                    <SearchBar showIcons
                        ref={el => this.SearchBarRef = el}
                        placeholder={searchPlaceholder}
                        onChange={this.throttleSearch}
                    />
                </div>
                <div className="container">
                    <div className="content">
                        <Sort/>
                    </div>
                    <div className="footer">
                        <LogoText />
                    </div>
                </div>
            </div>
        );
    }

    handleSearch(e, search) {
        console.log('handleSearch:', arguments)
    }
}

export default Drawer;
