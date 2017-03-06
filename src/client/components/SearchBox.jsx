import React, { Component, PropTypes } from 'react';
import classes from 'classnames';

class SearchBox extends Component {
    render() {
        const {hasIcon, ...props} = this.props
        const searchboxClasses = classes('searchbox-content', this.props.className, {
            "mdi mdi-magnify": hasIcon
        });


        return (
            <div className="searchbox">
                <input type="text" className={searchboxClasses} {...props}/>
            </div>
        )
    }
}

SearchBox.defaultProps = {
    hasIcon: false
}

export default SearchBox
