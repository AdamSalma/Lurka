import React from 'react';

import Alerts from './Alerts'
import ContextMenu from './ContextMenu'
import Preloader from './Preloader'
import Theme from './Theme'
import Watcher from './Watcher'

const {alertPosition} = window.Lurka;

export default () => (
    <div className="Services">
        <Alerts/>
        <ContextMenu/>
        <Preloader/>
        <Theme/>
        <Watcher/>
    </div>
)
