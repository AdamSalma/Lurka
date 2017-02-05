import React, {Component} from 'react'

import SortPanel from './SortPanel'
import FilterPanel from './FilterPanel'
import ArchivePanel from './ArchivePanel'
import WatchPanel from './WatchPanel'


class HeaderPanels extends Component {
    constructor(props) {
        super(props);
        
    }

    componentDidUpdate(prevProps, prevState) {
        console.error("Component did update! ", this.props.activePanel)
    }

    render() {
        const {activePanel} = this.props

        return (
            <div className="header-panels">
                <WatchPanel isActive={activePanel === "watch"} {...this.props} />
                <ArchivePanel isActive={activePanel === "archive"} {...this.props} />
                <FilterPanel isActive={activePanel === "filter"} {...this.props} />
                <SortPanel isActive={activePanel === "sort"} {...this.props} />
            </div>
        )
    }
}

export default HeaderPanels
