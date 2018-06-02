import React, { PropTypes } from 'react';
import cx from 'classnames';

import './HeaderButtonIcon.styles';

import { Icon } from '~/components/UI';

const HeaderButtonIcon = ({ className, onClick, ...restProps }) => {
    return (
        <button className={cx('HeaderButtonIcon', className)} onClick={onClick}>
            <Icon {...restProps}/>
        </button>
    );
};

HeaderButtonIcon.displayName = 'HeaderButtonIcon';

HeaderButtonIcon.propTypes = {
    className: PropTypes.string,
};

export default HeaderButtonIcon;
