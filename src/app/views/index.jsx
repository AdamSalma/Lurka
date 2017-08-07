import React, { PropTypes } from 'react';

import DashboardView   from './DashboardView';
import ContentView from './ContentView';
import MediaView from './MediaView';

const Views = ({ id }) => {
    return (
        <div id={id} className="Views">
            <DashboardView />
            <ContentView />
            <MediaView />
        </div>
    );
};

Views.displayName = 'Views';

Views.propTypes = {
    id: PropTypes.string,
};

export default Views;
