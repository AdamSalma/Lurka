import React from 'react';
import cx from 'classnames';

import './styles';
import mapPropsToClasses from './classes';

const Card = (props) => {
    return <div {...props}
        className={mapPropsToClasses(props)}
    />;
};

Card.displayName = 'Card';

export default Card;
