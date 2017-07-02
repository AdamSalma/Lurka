import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import {BoardList, BoardSelection} from './containers';
import {HomeBoard} from './components';
import {Logo, Scrollable} from '~/components';

import './Dashboard.styles';

class Dashboard extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { className } = this.props;
        return (
            <DragDropContextProvider backend={HTML5Backend}>
                <div className="Dashboard">
                    <div className="Dashboard__header">
                        <BoardList />
                        <Logo/>
                        <HomeBoard />
                    </div>
                    <div className="Dashboard__boards">
                        <Scrollable>
                            <BoardSelection/>
                        </Scrollable>
                    </div>
                </div>
            </DragDropContextProvider>
        );
    }
}

export default Dashboard;
