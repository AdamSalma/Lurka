import React, { PureComponent, PropTypes } from 'react';
import classes from "classnames";

export default class Scrollable extends PureComponent {
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
        const scrollClasses = classes(className, "nano");

        return (
            <div ref={s => this._scroller = $(s)} className={scrollClasses}>
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
