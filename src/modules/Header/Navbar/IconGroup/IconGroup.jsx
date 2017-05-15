import './IconGroup.styles'
import React, {
    PropTypes
} from 'react';

import {
    Icon,
    Notification
} from '~/components'
import {
    emitDrawerToggle
} from '~/events/publishers'

const i = window.appSettings.icons

const IconGroup = (props) => {
    const {
        activePanel,
        className,
        toggleDrawer,
        togglePanel,
    } = props

    return (
        <div className={['IconGroup', className].join(' ')}>
          <Notification number={0}>
            <Icon
              name={i.navbarEye}
              title='Thread Watcher'
              onClick={() => togglePanel('watch')} />
          </Notification>
          <Icon
            name={i.navbarArchive}
            title='Local archive'
            onClick={() => togglePanel('archive')} />
          <Icon
            name={i.navbarAccount}
            title='Account'
            onClick={() => togglePanel('account')} />
          <Icon
            name={i.navbarSettings}
            title='Settings'
            onClick={() => togglePanel('settings')} />
        </div>
    )
};

IconGroup.displayName = 'IconGroup';

IconGroup.propTypes = {
    className: PropTypes.string,
};

export default IconGroup;

