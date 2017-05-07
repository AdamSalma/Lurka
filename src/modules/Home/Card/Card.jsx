import './Card.styles'
import React, { PropTypes } from 'react';
import cx from 'classnames'

const Card = ({ className, title, description, info, onClick }) => {
    // TODO: Home/Card::info
    return (
        <div className={cx(className, 'Card')} onClick={onClick}>
            <h2 className="Card__title">
                {title}
            </h2>
            <div className="Card__description">
                {description}
            </div>
        </div>
    );
};

Card.displayName = 'Card';

Card.propTypes = {
    className: PropTypes.string,
};

export default Card;
