import React, { Component, PropTypes } from 'react';
import classNames from "classnames";

export default class Scrollable extends Component {
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

    render () {
        const {children, className, onScroll} = this.props;
        const classes = classNames(className, "nano");

        return (
            <div ref={s => this._scroller = $(s)} className={classes}>
                <div className="scrollable nano-content" onScroll={onScroll}>
                    {children}
                </div>
            </div>
        )
    }

    updateScroller( opts={} ) {
        this._scroller.nanoScroller(opts);
    }
} 

Scrollable.defaultProps = {
    scrollOpts: {sliderMinHeight: 50}
}

Scrollable.propTypes = { }
