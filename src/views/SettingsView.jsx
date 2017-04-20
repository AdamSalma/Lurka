import React, { PropTypes } from 'react';

import Settings from '~/modules/Settings'

const SettingsView = ({ className, ...restProps }) => {
    return (
        <div {...restProps} className={[
            'View SettingsView', className
        ].join(' ')}>
            <h2>This is SettingsPage</h2>
        </div>
    );
};

SettingsView.displayName = 'SettingsView';

SettingsView.propTypes = {
    className: PropTypes.string,
};

export default SettingsView;
