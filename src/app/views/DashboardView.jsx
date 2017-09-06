import React from 'react';
import cx from 'classnames'

import Dashboard from '~/containers/Dashboard';

const DashboardView = ({ className }) => {
    return (
        <section className={cx('View DashboardView', className)}>
            <Dashboard />
        </section>
    );
};

DashboardView.displayName = 'DashboardView';

export default DashboardView;
