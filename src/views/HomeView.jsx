import React, { PropTypes } from 'react';
import BoardSelection from '~/modules/BoardSelection';

const HomeView = ({ className, children }) => {
    return (
        <section className={[
            'View HomeView', className
        ].join(' ')}>
            <BoardSelection />
        </section>
    );
};

HomeView.displayName = 'HomeView';

HomeView.propTypes = {
    className: PropTypes.string,
};

export default HomeView;
