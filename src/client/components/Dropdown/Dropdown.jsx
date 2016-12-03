import React, { Component } from 'react';
import uuid from "uuid";
import classNames from "classnames";

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
        const {items, className, handleClick} = this.props;
        const classes = classNames(className, "nano");

        return (
            <div ref="dropdown" className={classes}>
                <div className="dropdown nano-content" onClick={handleClick}>
                    {items.map( item => 
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
    scrollOpts: {},
    items: []
}
