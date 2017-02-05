import React, {Component} from 'react'
import classNames from 'classnames'

import {HeaderPanel} from '~/components'


export default function WatchPanel({isActive}) {
    return <HeaderPanel isActive={isActive} className="watch-panel">
        <h1>Watch Panel</h1>
        <ul>
            <li>Watch</li>
        </ul>
    </HeaderPanel>
}
