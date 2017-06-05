import React, { PropTypes } from 'react';
import cx from 'classnames'
// import BoardSelection from '~/modules/BoardSelection';
import Home from '~/modules/Home';

const HomeView = ({ className, children }) => {
    return (
        <section className={cx('View HomeView', className)}>
            <Home.containers.BoardSearch/>
            <Home.containers.BoardList/>
            {/*<BoardSelection />*/}
        </section>
    );
};

HomeView.displayName = 'HomeView';

HomeView.propTypes = {
    className: PropTypes.string,
};

export default HomeView;
