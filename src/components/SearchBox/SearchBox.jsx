import './SearchBox.styles'
import React from 'react';
import classes from 'classnames';

export default function SearchBox ({hasIcon=false, className, ...restProps}) {
    const searchboxClasses = classes('content', className, {
        "mdi mdi-magnify": hasIcon
    });

    return (
        <div className="Searchbox">
            <input type="text" className={searchboxClasses} {...restProps}/>
        </div>
    )
}
