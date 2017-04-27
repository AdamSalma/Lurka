import React, { PropTypes } from 'react';

import Board from '~/modules/Board'
import Thread from '~/modules/Thread'
import Header from '~/modules/Header'


const ContentView = ({ id, className, ...restProps }) => {
    return (
        <div id={id} {...restProps} className={[
            'View ContentView', className
        ].join(' ')}>
            <Board />
            <Thread />
            <Header />
        </div>
    );
};

ContentView.displayName = 'ContentView';

ContentView.propTypes = {
    className: PropTypes.string,
};

export default ContentView;
