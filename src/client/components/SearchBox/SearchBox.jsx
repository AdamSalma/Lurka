import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class SearchBox extends Component {
    render() {
        const {hasIcon, ...props} = this.props
        const classes = classNames('searchbox-content', this.props.className, {
            "mdi mdi-magnify": hasIcon
        });


        return (
            <div className="searchbox">
                <span className=""></span>
                <input type="text" className={classes} {...props}/>
            </div>
        )
    }
}

SearchBox.defaultProps = {
    hasIcon: true
}

export default SearchBox