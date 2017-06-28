import React, { PropTypes } from 'react';
import cx from 'classnames'
// import BoardSelection from '~/modules/BoardSelection';
import Home from '~/modules/Home';
import { Container } from '~/components';
import './HomeView.styles';

const HomeView = ({ className, children }) => {
    return (
        <section className={cx('View HomeView', className)}>
            <Home.containers.BoardSearch/>
            <Container className="HomeView__Container">
                <Home.containers.BoardList/>
                <Home.containers.HomeBoard/>
            </Container>
            {/*<BoardSelection />*/}
        </section>
    );
};

HomeView.displayName = 'HomeView';

HomeView.propTypes = {
    className: PropTypes.string,
};

export default HomeView;
