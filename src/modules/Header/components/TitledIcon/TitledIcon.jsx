import React from 'react';
import './TitledIcon.styles';
import Icon from '~/components/Icon';

export default function TitledIcon ({ name, title, className }) {
    return <div className={className)}>
        <Icon name={name} className="TitledIcon"/>
        <span>{title}</span>
    </div>
}
