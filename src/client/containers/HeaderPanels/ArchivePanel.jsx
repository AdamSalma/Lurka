import React, {Component} from 'react'
import classNames from 'classnames'

import {HeaderPanel} from '~/components'


export default function ArchivePanel({isActive}) {
    return <HeaderPanel isActive={isActive} className="archive-panel">
        <h1>Archive Panel</h1>
        <ul>
            <li>Archive</li>
        </ul>
    </HeaderPanel>
}
