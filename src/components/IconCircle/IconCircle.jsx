import './IconCircle.styles';

import React, { PropTypes } from 'react';
import cx from 'classnames';

import ButtonCircle from '../ButtonCircle';
import Icon from '../Icon';

const IconCircle = ({ className, name, ...restProps }) => {
    return (
        <ButtonCircle className={cx('IconCircle', className)}>
            <Icon name={name} {...restProps}/>
        </ButtonCircle>
    );
};

IconCircle.displayName = 'IconCircle';

IconCircle.propTypes = {
    className: PropTypes.string,
};

export default IconCircle;
