import './ContentButtonGroup.styles';
import React, { PropTypes } from 'react';
import { Icon } from '~/components';

const ContentButtonGroup = ({ className, children, onArrowClick, onButtonClick }) => {
    return (
        <div className={[
            "ContentButtonGroup", 
            className
        ].join(' ')}>
            <div className="arrow arrow-left" onClick={() => onArrowClick({left:true})}>
                <Icon name="chevron-left"/>
            </div>
            <button className="button" onClick={onButtonClick}>
                {children}
            </button>
            <div className="arrow arrow-right" onClick={() => onArrowClick({right:true})}>
                <Icon name="chevron-right"/>
            </div>

        </div>
    );
};

ContentButtonGroup.displayName = 'ContentButtonGroup';

export default ContentButtonGroup;
