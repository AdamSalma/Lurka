import React, { PropTypes, Children } from 'react';
import cx from 'classnames';

import './ScrollableList.styles';
import { Scrollable } from '~/components';

const ScrollableList = ({ className, children, ...restProps }) => {
    return (
        <Scrollable className={cx('ScrollableList', className)} {...restProps}>
            <ul className='ScrollableList__container'>
                {Children.map(children, child => (
                    <li className="ScrollableList__item">
                        {child}
                    </li>
                ))}
            </ul>
        </Scrollable>
    );
};

ScrollableList.displayName = 'ScrollableList';

ScrollableList.propTypes = {
    className: PropTypes.string,
};

export default ScrollableList;
