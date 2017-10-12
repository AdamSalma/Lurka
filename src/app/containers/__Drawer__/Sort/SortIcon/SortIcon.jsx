import './SortIcon.styles';
import React, { PropTypes } from 'react';
import cx from 'classnames';

import {Icon} from '~/components'

const SortIcon = ({ active, iconName, ...restProps }) => {
    return (
        <button className={cx("SortIcon", {active})} {...restProps}>
            <Icon name={iconName}/>
        </button>
    );
};

SortIcon.displayName = 'SortIcon';

SortIcon.propTypes = {
    className: PropTypes.string,
};

export default SortIcon;
