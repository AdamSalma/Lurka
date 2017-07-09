import React, { PropTypes } from 'react';
import cx from 'classnames'

import Radio from './Radio'

const RadioField = ({ className, label, isActive, onClick }) => {
    console.info(label);
    return (
        <div className={cx("RadioGroup__field", className, {
            'RadioGroup__field--active': isActive
        })} onClick={onClick}>
            <Radio isActive={isActive} />
            <div className="RadioGroup__label">
                {label}
            </div>
        </div>
    );
};

RadioField.displayName = 'RadioField';

RadioField.propTypes = {
    className: PropTypes.string,
};

export default RadioField;
