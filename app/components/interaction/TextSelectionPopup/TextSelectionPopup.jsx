import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import {
    isJQueryElement,
    isString
} from '~/utils/types';

import './TextSelectionPopup.styles';

class TextSelectionPopup extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);

        this.setContext(props.context)
    }

    render() {
        if (!this.state.isTextSelected)
            return null

        const { className, } = this.props;
        return (
            <div className={cx('TextSelectionPopup', className)}>

            </div>
        );
    }

    addSelectionListener(el) {
        el.on("keyUp", function(){
            window.getSelection()
        })

        this.context = el
    }

    removeSelectionListener() {

    }

    setContext = (context) => {
        if (isJQueryElement(context)) {
            this.context = context
        } else {
            this.context = $(context)
        }
    }
}

export default TextSelectionPopup;
