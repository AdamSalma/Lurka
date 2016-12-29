import React, { Component } from "react";

import HomePanel from './HomePanel';
import BoardPanel from './BoardPanel';
import ThreadPanel from './ThreadPanel';
import SettingsPanel from './SettingsPanel';
import GlobalPanel from './GlobalPanel';

export default class App extends Component {
    render() {
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
}
