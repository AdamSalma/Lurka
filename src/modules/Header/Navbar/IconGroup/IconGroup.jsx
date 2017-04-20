import "./IconGroup.styles"
import React, { PropTypes } from 'react';

import HeaderIcon from './HeaderIcon'

const i = window.appSettings.icons

const IconGroup = (props) => {
    const {
        activePanel,
        className,
        toggleDrawer,
        togglePanel,
        isDrawerOpen
    } = props

    console.warn('Rendering IconGroup')

    return (
        <div className={[
            "IconGroup",
            className
        ].join(' ')}>
            <HeaderIcon name={i.navbarEye} title="Thread Watcher"
                onClick={() => togglePanel('watch')}
                active={activePanel === 'watch'}
            />
            <HeaderIcon name={i.navbarArchive} title="Local archive"
                onClick={() => togglePanel('archive')}
                active={activePanel === 'archive'}
            />
            <HeaderIcon name={i.navbarPaintbucket} title="Theme"
                onClick={() => togglePanel('theme')}
                active={activePanel === 'theme'}
            />
            {
                isDrawerOpen
                    ? <HeaderIcon
                        key="chevron"
                        name={i.navbarChevron}
                        title="Minimize"
                        onClick={toggleDrawer}/>
                    : <HeaderIcon
                        key="search"
                        name={i.navbarSearch}
                        title="Search"
                        onClick={toggleDrawer}/>

            }
        </div>
    );
};

IconGroup.displayName = 'IconGroup';

IconGroup.propTypes = {
    className: PropTypes.string,
};

export default IconGroup;
