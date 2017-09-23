import React, { Component } from 'react';
import classes from "classnames";
import {isJQueryElement} from '~/utils/types';
import {getDisplayName} from '~/utils/react';


const Scrollable = (WrappedComponent, scrollOpts) => {
    const defaultScrollToOpts = {
        easing: [0.445, 0.05, 0.55, 0.95]
    }

    class HOC extends Component {
        static defaultProps = {
            scrollOpts: {
                sliderMinHeight: 50
            }
        }

        componentDidMount() {
            this.updateScroller(scrollOpts)
            this.$scrollContext = $(this._scrollContainer)
        }

        componentWillUnmount() {
            this.updateScroller({ destroy: true })
        }

        componentDidUpdate(prevProps, prevState) {
            this.updateScroller()
        }

        render () {
            const {className, onScroll, ...restProps} = this.props;
            const scrollClasses = classes(className, "nano");

            return (
                <div className={cx(className, 'nano')} ref={this.setScrollerRef}>
                    <div className="scrollable nano-content" onScroll={onScroll} ref={this.setContainerRef}>
                        <WrappedComponent {...this.restProps}
                            scrollTo={this.scrollTo}
                            updateScroller={this.updateScroller}
                        />
                    </div>
                </div>
            )
        }

        setScrollerRef = (ref) => this._scroller = ref
        setContainerRef = (ref) => this._scrollContainer = ref

        updateScroller = (opts={}) => {
            this._scroller && $(this._scroller).nanoScroller(opts);
        }

        scrollTo = (element, opts=defaultScrollToOpts) => {
            if (!this._scroller) {
                console.warn("No Scrollable reference set");
                return
            }

            if (!isJQueryElement(element)) {
                element = $(element);
            }

            const $item = this.$scrollContext.find(href);

            element.stop().velocity('scroll', {
                container: this.$scrollContext,
                ...opts
            });
        }
    }

    HOC.displayName = `ScrollableHOC__${getDisplayName(WrappedComponent)}`;

    return HOC
}

export default Scrollable
