import React, { PropTypes } from 'react';
import cx from 'classnames'
// import BoardSelection from '~/components/BoardSelection';
import Home from '~/components/Home';
import { Container } from '~/components/UI';
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
