import React, {Component} from 'react'

import SortPanel from './SortPanel'
import FilterPanel from './FilterPanel'
import ArchivePanel from './ArchivePanel'
import WatchPanel from './WatchPanel'


export default function HeaderPanels(props) {
    const {activePanel: panel} = props

    return (
        <div className="header-panels">
            <WatchPanel isActive={panel === "watch"} {...props} />
            <ArchivePanel isActive={panel === "archive"} {...props} />
            <FilterPanel isActive={panel === "filter"} {...props} />
            <SortPanel isActive={panel === "sort"} {...props} />
        </div>
    )
}
