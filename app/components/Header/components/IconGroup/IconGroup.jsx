import './IconGroup.styles'
import React, {
    PropTypes
} from 'react';

import {
    Icon,
    Notification
} from '~/components/UI'
import {
    emitDrawerToggle
} from '~/events/publishers'

const i = Lurka.icons;

const IconGroup = (props) => {
    const {
        activePanel,
        className,
        toggleDrawer,
        togglePanel,
        isSubHeaderOpen
    } = props;

    return (
        <div className={['IconGroup', className].join(' ')}>
          <Icon
            name={i.navbarAccount}
            title='Account'
            onClick={() => togglePanel('account')} />
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
          {isSubHeaderOpen
            ? <Icon
                name={i.subNavbarClose}
                title='Close Submenu' />
            : <Icon
                name={i.subNavbarOpen}
                title='Open Submenu' />
          }
        </div>
    )
};

IconGroup.displayName = 'IconGroup';

IconGroup.propTypes = {
    className: PropTypes.string,
};

export default IconGroup;

