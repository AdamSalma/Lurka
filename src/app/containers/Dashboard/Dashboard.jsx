import React, { Component } from 'react';
import cx from 'classnames';

import {BoardList, BoardSelection} from './containers';
import {HomeBoard} from './components';
import {Logo, Scrollable, Icon} from '~/components';

import './Dashboard.styles';

import {
    emitContentViewToggle
} from '~/events'

const i = window.appSettings.icons;

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { className } = this.props;
        return (
            <div className="Dashboard">
                <div className="header">
                    {/*<BoardList accepts="BoardListItem"/>
                    {<Logo/>}
                    <HomeBoard />*/}

                    <div className="icon-button" onClick={emitContentViewToggle}>
                        <Icon name={i.dashboardReturn}/>
                    </div>
                </div>
                <Scrollable className="boards">
                    <BoardSelection />
                </Scrollable>
            </div>
        );
    }
}

export default Dashboard;
