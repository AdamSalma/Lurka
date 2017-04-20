import React, { PropTypes } from 'react';

import HomeView   from './HomeView';
import ContentView from './ContentView';
import SettingsView from './SettingsView';


const Views = ({ id }) => {
    return (
        <div id={id} className="Views">
            <HomeView />
            <ContentView />
            <SettingsView />
        </div>
    );
};

Views.displayName = 'Views';

Views.propTypes = {
    className: PropTypes.string,
};

export default Views;
