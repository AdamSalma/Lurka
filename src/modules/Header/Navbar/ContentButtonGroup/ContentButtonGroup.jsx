import './ContentButtonGroup.styles';
import React, { PropTypes } from 'react';
import { Icon } from '~/components';

const i = window.appSettings.icons

const ContentButtonGroup = ({ className, children, onArrowClick, onButtonClick }) => {
    return (
        <div className={[
            "ContentButtonGroup",
            className
        ].join(' ')}>
            <div className="arrow arrow-left" onClick={() => onArrowClick({right:true})}>
                <Icon name={i.navbarCompose}/>
            </div>
            <button className="button" onClick={onButtonClick}>
                {children}
            </button>
            <div className="arrow arrow-right" onClick={() => onArrowClick({right:true})}>
                <Icon name={i.navbarRefresh}/>
            </div>

        </div>
    );
};

ContentButtonGroup.displayName = 'ContentButtonGroup';

export default ContentButtonGroup;
