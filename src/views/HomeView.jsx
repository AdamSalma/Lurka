import React, { PropTypes } from 'react';

const HomeView = ({ className, children }) => {
    return (
        <div className={[
            'View HomeView', className
        ].join(' ')}>
            Home Panel!
            {children}
        </div>
    );
};

HomeView.displayName = 'HomeView';

HomeView.propTypes = {
    className: PropTypes.string,
};

export default HomeView;
