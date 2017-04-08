import React, {Component} from 'react'
import classes from 'classnames'

import {HeaderPanel} from '~/components'


export default function SortPanel({isActive}) {
    return <HeaderPanel isActive={isActive} className="sort-panel">
        <h1>Sort Panel</h1>
        <ul>
            <li>Sort</li>
        </ul>
    </HeaderPanel>
}
