import React, { PropTypes } from 'react';

import HomeView   from './HomeView';
import ContentView from './ContentView';
import SettingsView from './SettingsView';


const Views = ({ id, homeID, contentID, settingsID }) => {
    return (
        <div id={id} className="Views">
            <HomeView id={homeID}/>
            <ContentView id={contentID}/>
            <SettingsView id={settingsID} />
        </div>
    );
};

Views.displayName = 'Views';

Views.propTypes = {
    id: PropTypes.string,
    homeID: PropTypes.string,
    contentID: PropTypes.string,
    settingsID: PropTypes.string,
};

export default Views;
