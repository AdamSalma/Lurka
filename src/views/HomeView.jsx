import React, { PropTypes } from 'react';
import Home from '~/modules/Home'

const HomeView = ({ className, children }) => {
    return (
        <section className={[
            'View HomeView', className
        ].join(' ')}>
            <Home />
        </section>
    );
};

HomeView.displayName = 'HomeView';

HomeView.propTypes = {
    className: PropTypes.string,
};

export default HomeView;
