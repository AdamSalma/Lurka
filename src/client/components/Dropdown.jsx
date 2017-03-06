import React, { Component, PropTypes } from 'react';
import uuid from "uuid";
import classes from "classnames";

export default class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.updateScroller = this.updateScroller.bind(this);
    }

    componentDidMount() {
        this.updateScroller(this.props.scrollOpts)
    }

    componentWillUnmount() {
        this.updateScroller({ destroy: true })
    }

    componentDidUpdate(prevProps, prevState) {
        this.updateScroller()
    }

    updateScroller( opts={} ) {
        $(this.refs.dropdown).nanoScroller(opts);
    }

    render () {
        const {items, className, onClick} = this.props;
        const dropdownClasses = classes(className, "nano");

        return (
            <div ref="dropdown" className={dropdownClasses}>
                <div className="dropdown nano-content" onClick={onClick}>
                    {items.length && items.map( item => 
                        <span key={uuid.v4()} className="item">
                            {item}
                        </span>
                    )}
                </div>
            </div>
        )
    }
} 

Dropdown.defaultProps = {
    scrollOpts: {sliderMinHeight: 50},
    items: []
}

Dropdown.propTypes = {
    items: PropTypes.array
}
