import React, { PropTypes } from 'react';
import Home from '~/modules/Home'

const HomeView = ({ className, children }) => {
    return (
        <div className={[
            'View HomeView', className
        ].join(' ')}>
            <Home />
        </div>
    );
};

HomeView.displayName = 'HomeView';

HomeView.propTypes = {
    className: PropTypes.string,
};

export default HomeView;
