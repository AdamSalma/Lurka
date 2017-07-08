import React, { PropTypes } from 'react';
import cx from 'classnames'

import {
    WatchPanel,
    ArchivePanel
} from './assemblies';

const Panels = ({ className, isDrawerOpen, activePanel: panel, ...restProps}) => {
    console.log("Active panel is:", panel)
    const panelClass = cx('HeaderPanels', {'drawer-open': isDrawerOpen}, className)
    return (
        <div className={panelClass}>
            <WatchPanel isActive={panel === "watch"} isDrawerOpen={isDrawerOpen} {...restProps} />
            <ArchivePanel isActive={panel === "archive"} isDrawerOpen={isDrawerOpen} {...restProps} />
        </div>
    );
};

Panels.displayName = 'Panels';

Panels.propTypes = {
    className: PropTypes.string,
};

export default Panels;
