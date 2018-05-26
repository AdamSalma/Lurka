import React from 'react';
import './styles'

// import DashboardView   from './DashboardView';
import ContentView from './ContentView';
import CinemaView from './CinemaView';
import PanelsView from './PanelsView';
import PostView from './PostView';

const Views = ({ id }) => {
    return (
        <div id={id} className="Views">
            <ContentView />
            <CinemaView />
            <PanelsView />
            <PostView />
        </div>
    );
};

Views.displayName = 'Views';

export default Views;
