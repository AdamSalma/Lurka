import React, { PropTypes } from 'react';
import cx from 'classnames'

import Cinema from '~/modules/Cinema';

const CinemaView = ({ className }) => {
    return (
        <section className={cx('View CinemaView', className)}>
            <Cinema/>
        </section>
    );
};

CinemaView.displayName = 'CinemaView';

export default CinemaView;
