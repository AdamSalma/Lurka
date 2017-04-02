import "./HeaderIconGroup.styles"
import React, { Component, PropTypes } from 'react';

import HeaderIcon from './HeaderIcon'

class HeaderIconGroup extends Component {
    constructor(props) {
        super(props);
        this.handleIconClick = this.handleIconClick.bind(this)
    }

    render() {
        const onClick = this.handleIconClick
        const {activePanel, icons, className} = this.props

        return (
            <div className={[
                "HeaderIconGroup", 
                className
            ].join(' ')}>
                {icons.map(iconName => {
                    switch (iconName) {
                        case 'watch':
                            return <HeaderIcon name="eye" key="watch"
                                onClick={() => onClick('watch')}
                                active={activePanel === 'watch'}
                            />
                        case 'archive':
                            return <HeaderIcon name="archive" key="archive"
                                onClick={() => onClick('archive')}
                                active={activePanel === 'archive'}
                            />
                        case 'account':
                            return <HeaderIcon name="account" key="account"
                                onClick={() => onClick('account')}
                                active={activePanel === 'account'}
                            />
                        case 'filter':
                            return <HeaderIcon name="filter" key="filter"
                                onClick={() => onClick('filter')}
                                active={activePanel === 'filter'}
                            />
                        case 'sort':
                            return <HeaderIcon name="sort" key="sort"
                                onClick={() => onClick('sort')}
                                active={activePanel === 'sort'}
                            />
                        case 'search':
                            return <HeaderIcon name="magnify" key="search"
                                onClick={() => onClick('search')}
                                active={activePanel === 'search'}
                            />
                        case 'layout':
                            return <HeaderIcon name="view-dashboard" key="layout"
                                onClick={() => onClick('layout')}
                                active={activePanel === 'layout'}
                            />
                        default: 
                            throw new Error('Invalid HeaderIconGroup name:', iconName)
                    }
                })}            
            </div>
        );
    }

    handleIconClick(panel) {
        this.props.toggleHeaderPanel({panel})
    }
}

export default HeaderIconGroup;
