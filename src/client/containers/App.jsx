import React, { Component } from "react";

import HomePanel from './HomePanel';
import BoardPanel from './BoardPanel';
import ThreadPanel from './ThreadPanel';
import SettingsPanel from './SettingsPanel';
import GlobalPanel from './GlobalPanel';

export const App = () => {
    return (
        <div id="pages">
            <HomePanel/>
            <BoardPanel/>
            <ThreadPanel/>
            <SettingsPanel/>
            <GlobalPanel/>
    	</div>
    )
}

export class AppContainer extends Component {
    constructor({instances}) {
        super();

        
    }

    render() {
        this.props.instances
    }
}
