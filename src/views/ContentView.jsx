import React, { PropTypes } from 'react';

import Board from '~/modules/Board'
import Thread from '~/modules/Thread'
import Header from '~/modules/Header'


const ContentView = ({ className, ...restProps }) => {
    return (
        <div {...restProps} className={[
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
