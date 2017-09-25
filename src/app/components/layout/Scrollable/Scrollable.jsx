import React, { PureComponent } from 'react';
import classes from "classnames";
import utils from '~/utils';

export default class Scrollable extends PureComponent {

    componentDidMount() {
        this.updateScroller(this.props.scrollOpts)

        if (this.props.onScroll) {
            this.attachScrollListener(this.props.onScroll)
        }
    }

    componentWillUnmount() {
        this.updateScroller({ destroy: true });
        this.removeScrollListener();
    }

    componentDidUpdate(prevProps, prevState) {
        this.updateScroller()
    }

    removeScrollListener() {
        if (this.onScroll) {
            window.removeEventListener("scroll", this.onScroll, { passive: true })
        }
    }

    attachScrollListener( onScroll ) {

        if (!utils.types.isFunction(onScroll)) {
            console.warn("No onScroll set for Scrollable. Received:", onScroll);
            return
        }
        console.warn("Setting onScroll listener for Scrollable");

        var ticking = false;

        this.onScroll = function(e) {
          if (!ticking) {
            window.requestAnimationFrame(function() {
              onScroll(e);
              ticking = false;
            });
          }
          ticking = true;
        }

        this._scroller.addEventListener('scroll', this.onScroll, { passive: true });
    }

    render () {
        const {
            children, className, containerProps={},
            onScroll, scrollOpts, translate3d,
            ...restProps
        } = this.props;

        const containerClasses = classes(containerProps.className, "nano");
        const scrollerClasses = classes(className, "nano-content");

        return (
            <div {...containerProps} className={containerClasses} ref={el => this._container = el}>
                <div
                    className={scrollerClasses}
                    ref={el => this._scroller = el}
                    style={translate3d && {transform: "translate3d(0, 0, 0)"}  /*<- performance boost using hardware accelleration */}
                    {...restProps}>
                    {children}
                </div>
            </div>
        )
    }

    updateScroller = ( opts={} ) => {
        this._container && $(this._container).nanoScroller(opts);
    }

    scrollTo = ({ element, offset, options }) => {
        if (!this._scroller) {
            console.warn("No Scrollable reference is set");
            return
        }

        if (element) {
            offset = this._scroller.find(element).offsetTop
            console.log(`Scroll element is offset by ${offset}`);
        } else if (isNaN(offset)) {
            throw new Error("No element or offset provided to Scrollable.scrollTo()");
        }

        const opts = Object.assign({}, options)
        opts.offset = offset
        // opts.container = this._scroller

        this._performScroll(opts);
    }

    _performScroll = (options) => {
        this._scroller && $(this._scroller).stop().velocity("scroll", options)
    }
}

Scrollable.defaultProps = {
    scrollOpts: {sliderMinHeight: 50}
}
