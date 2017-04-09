import './Sidebar.styles'
import React, { PropTypes } from 'react';

import {ButtonCircle, LogoText, Icon} from '~/components'

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
            <div className="line"/>
            <SidebarIcon name="account" onClick={() => toggle('account')}/>
            <SidebarIcon name="storage" onClick={() => toggle('storage')}/>
            <SidebarIcon name="download" onClick={() => toggle('download')}/>
            <SidebarIcon name="eye" onClick={() => toggle('eye')}/>
            <SidebarIcon name="settings" onClick={() => toggle('settings')}/>
        </div>
    );
};

Sidebar.displayName = 'Sidebar';

export default Sidebar;
