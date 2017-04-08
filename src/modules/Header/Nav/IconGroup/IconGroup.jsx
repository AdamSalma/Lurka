import "./IconGroup.styles"
import React, { Component, PropTypes } from 'react';

import HeaderIcon from './HeaderIcon'

class IconGroup extends Component {
    constructor(props) {
        super(props);
        this.handleIconClick = this.handleIconClick.bind(this)
    }

    render() {
        const onClick = this.handleIconClick
        const {activePanel, icons, className} = this.props

        return (
            <div className={[
                "IconGroup", 
                className
            ].join(' ')}>
                {icons.map(iconName => {
                    switch (iconName) {
                        case 'watch':
                            return <HeaderIcon name="eye" key="watch" title="watch"
                                onClick={() => onClick('watch')}
                                active={activePanel === 'watch'}
                            />
                        case 'archive':
                            return <HeaderIcon name="archive" key="archive" title="archive"
                                onClick={() => onClick('archive')}
                                active={activePanel === 'archive'}
                            />
                        case 'account':
                            return <HeaderIcon name="account" key="account" title="account"
                                onClick={() => onClick('account')}
                                active={activePanel === 'account'}
                            />
                        case 'filter':
                            return <HeaderIcon name="filter" key="filter" title="filter"
                                onClick={() => onClick('filter')}
                                active={activePanel === 'filter'}
                            />
                        case 'sort':
                            return <HeaderIcon name="sort" key="sort" title="sort"
                                onClick={() => onClick('sort')}
                                active={activePanel === 'sort'}
                            />
                        case 'search':
                            return <HeaderIcon name="magnify" key="search" title="search"
                                onClick={() => onClick('search')}
                                active={activePanel === 'search'}
                            />
                        case 'layout':
                            return <HeaderIcon name="view-dashboard" key="layout" title="layout"
                                onClick={() => onClick('layout')}
                                active={activePanel === 'layout'}
                            />
                        default: 
                            throw new Error('Invalid IconGroup name:', iconName)
                    }
                })}            
            </div>
        );
    }

    handleIconClick(panel) {
        this.props.toggleHeaderPanel({panel})
    }
}

export default IconGroup;
