import {cloneElement, Children} from 'react';
import cx from 'classnames';

import './styles';

const HoverUnderline = ({ className, children }) => {
    return cloneElement( Children.only(children), {
        className: cx(className, children.props.className, 'HoverUnderline')
    });
};

HoverUnderline.displayName = 'HoverUnderline';

export default HoverUnderline;
