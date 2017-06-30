import React, { PropTypes } from 'react';

import Settings from '~/modules/Settings'

const SettingsView = ({ className, ...restProps }) => {
    return (
        <section {...restProps} className={[
            'View SettingsView', className
        ].join(' ')}>
            <h2>This is SettingsPage</h2>
        </section>
    );
};

SettingsView.displayName = 'SettingsView';

SettingsView.propTypes = {
    className: PropTypes.string,
};

export default SettingsView;
