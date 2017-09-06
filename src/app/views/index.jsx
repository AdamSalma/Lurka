import React, { PropTypes } from 'react';
import './styles'

import DashboardView   from './DashboardView';
import ContentView from './ContentView';
import CinemaView from './CinemaView';
import PanelsView from './PanelsView';

const Views = ({ id }) => {
    return (
        <div id={id} className="Views">
            <DashboardView />
            <ContentView />
            <CinemaView />
            <PanelsView />
        </div>
    );
};

Views.displayName = 'Views';

Views.propTypes = {
    id: PropTypes.string,
};

export default Views;
