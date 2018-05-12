import React, { PropTypes } from 'react';
import cx from 'classnames'

// import {Page} from '../../components';

const PageGrid = ({ className, children }) => {
    return (
        React.Children.map(children, (child, index) => {

        })
    );
};

PageGrid.displayName = 'PageGrid';

PageGrid.propTypes = {
    className: PropTypes.string,
};

export default PageGrid;
