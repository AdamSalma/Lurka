import './Sidebar.styles'
import React, { PropTypes } from 'react';

import {
    ButtonCircle, 
    LogoText, 
    Icon, 
    Line
} from '~/components'

const SidebarIcon = ({ name, ...restProps }) => {
    return (
        <ButtonCircle {...restProps}>
            <Icon name={name}/>
        </ButtonCircle>
    );
}

const Sidebar = ({ togglePanel: toggle }) => {
    return (
        <div className="Sidebar">
            <LogoText/>
            <Line />
            <SidebarIcon name="person-add" onClick={() => toggle('account')}/>
            <SidebarIcon name="ios-box" onClick={() => toggle('archive')}/>
            <SidebarIcon name="eye" onClick={() => toggle('eye')}/>
            <SidebarIcon name="gear-a" onClick={() => toggle('settings')}/>
        </div>
    );
};

Sidebar.displayName = 'Sidebar';

export default Sidebar;
