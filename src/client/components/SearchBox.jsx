import React from 'react';
import classes from 'classnames';

export default function SearchBox ({hasIcon=false, className, ...restProps}) {
    const searchboxClasses = classes('searchbox-content', className, {
        "mdi mdi-magnify": hasIcon
    });

    return (
        <div className="searchbox">
            <input type="text" className={searchboxClasses} {...restProps}/>
        </div>
    )
}
