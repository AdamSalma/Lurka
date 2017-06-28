import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import {BoardList, HomeBoard} from './containers'
// import './Dashboard.styles';

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
                <div>
                    <BoardList />
                    <HomeBoard />
                </div>
            </DragDropContextProvider>
        );
    }
}

export default Dashboard;
