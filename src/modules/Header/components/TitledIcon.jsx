import React from 'react';
import Icon from '~/components/Icon';

export default function TitledIcon ({ name, title, className }) {
    return <div className={className}>
        <Icon name={name}/>
        <span>{title}</span>
    </div>
}
