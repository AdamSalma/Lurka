import React, {Component} from 'react'
import classes from 'classnames'

import Panel from '../Panel'


export default function ArchivePanel({isActive}) {
    return <Panel isActive={isActive} className="archive-panel">
        <h1>Archive Panel</h1>
        <ul>
            <li>Archive</li>
        </ul>
    </Panel>
}
