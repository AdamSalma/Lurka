import "./IconGroup.styles"
import React, { Component, PropTypes } from 'react';

import HeaderIcon from './HeaderIcon'

class IconGroup extends Component {
    constructor(props) {
        super(props);
        this.togglePanel = this.togglePanel.bind(this)
    }

    render() {
        const {
            activePanel, 
            className,
            onSearchClick
        } = this.props

        return (
            <div className={[
                "IconGroup", 
                className
            ].join(' ')}>
                <HeaderIcon name="android-person" key="account" title="Account"
                    onClick={() => this.togglePanel('account')}
                    active={activePanel === 'account'}
                />
                <HeaderIcon name="ios-eye" key="watch" title="Thread Watcher"
                    onClick={() => this.togglePanel('watch')}
                    active={activePanel === 'watch'}
                />
                <HeaderIcon name="ios-box" key="archive" title="Local archive"
                    onClick={() => this.togglePanel('archive')}
                    active={activePanel === 'archive'}
                />
                <HeaderIcon name="paintbucket" key="theme" title="Theme"
                    onClick={() => this.togglePanel('theme')}
                    active={activePanel === 'theme'}
                />
                <HeaderIcon name="ios-search-strong" key="search" title="Search"
                    onClick={onSearchClick}
                />
            </div>
        );
    }

    togglePanel(panel) {
        this.props.toggleHeaderPanel({panel})
    }
}

export default IconGroup;
