import './Toolbar.styles'
import classes from 'classnames'

import React, { PropTypes } from 'react';
import { Icon } from '~/components'

const Toolbar = ({ className }) => {
    return (
        <div className={className}>
            <Icon name="star"/>
            <Icon name="home"/>
        </div>
    );
};

Toolbar.displayName = 'Toolbar';

Toolbar.propTypes = {
    className: PropTypes.string,
};

export default Toolbar;
