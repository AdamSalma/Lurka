import './Drawer.styles';
import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames'

import {
    SearchBar, LogoText, Icon
} from '~/components/UI'

import { invokeAfterUninterruptedDelay } from '~/utils'

import Sort from './Sort'

class Drawer extends PureComponent {
    constructor(props) {
        super(props);
        this.throttleSearch = invokeAfterUninterruptedDelay(200, this.handleSearch)
    }

    componentDidUpdate(prevProps, prevState) {
        const { isDrawerOpen } = this.props

        if (isDrawerOpen && prevProps.isDrawerOpen !== isDrawerOpen) {
            console.warn("Focusing drawer searchbox")
            this.searchBarRef.focus()
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
                        ref={el => this.searchBarRef = el}
                        placeholder={searchPlaceholder}
                        onChange={this.throttleSearch}
                    />
                </div>
                <div className="container">
                    <div className="content">
                        <Sort
                            className="Drawer__Panel"
                        />
                    </div>
                    <div className="footer">
                        <LogoText />
                        <Icon name="ios-lightbulb"/>
                        <Icon name="android-settings"/>
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
