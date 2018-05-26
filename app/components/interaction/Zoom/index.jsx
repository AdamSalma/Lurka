import React, { Component } from 'react';
import cx from 'classnames';
import { toDecimal } from '~/utils/conversions'
import { isFunction } from '~/utils/types'

class Zoom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            zoomScale: props.zoomScale || 1,
            scaleStep: props.zoomStep || 0.1,
            zoomOffsetX: props.zoomOffsetX || 0,
            zoomOffsetY: props.zoomOffsetY || 0
        }
    }

    componentDidMount() {
        $(this.reference).on('mousewheel DOMMouseScroll', this.handleScroll);
    }

    get style () {
        const { zoomScale } = this.state;

        return {
            transform: `scale(${ zoomScale })`,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,

        }
    }

    handleScroll = (e) => {
        const scrollDown = e.originalEvent.deltaY > 0;
        const { zoomScale, scaleStep } = this.state;
        const { maxZoomScale, minZoomScale } = this.props;

        const reachedLimit = scrollDown
            ? zoomScale - scaleStep > maxZoomScale
            : zoomScale + scaleStep < minZoomScale;

        if (reachedLimit) {
            console.warn("reached limit. no more zooming");
            return false
        }

        this.setState(state => ({
            zoomScale: scrollDown
                ? toDecimal(state.zoomScale - state.scaleStep)
                : toDecimal(state.zoomScale + state.scaleStep)
        }), () => console.warn(this.state.zoomScale) )

        // prevent page fom scrolling
        return false;
    }

    get reference () {
        return this._zoom;
    }

    setZoomRef = ref => this._zoom = ref;
    render() {
        const { className, children } = this.props;
        const { zoomScale } = this.state;

        console.error("Zoom render()");
        return (
            <div ref={this.setZoomRef}
              className={cx('Zoom', className)}
              onScroll={this.handleScroll}
              onMouseDown={this.handleMouseDown}
              onMouseUp={this.handleMouseUp}
              style={this.style}
            >
                {isFunction(children)
                    ? children(this.state)
                    : children
                }
            </div>
        );
    }

}

export default Zoom;
