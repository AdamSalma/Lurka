import React, {Component} from 'react'
import classNames from 'classnames'

import {HeaderPanel} from '~/components'


export default function FilterPanel({isActive}) {
    return <HeaderPanel isActive={isActive} className="filter-panel">
        <h1>Filter Panel</h1>
        <ul>
            <li>Filter</li>
        </ul>
    </HeaderPanel>
}
