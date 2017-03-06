import React, { Component, PropTypes } from "react";
import classes from "classnames"

export default class Elipses extends Component {
    constructor({maxDots, interval}) {
        super();
        this.tick = this.tick.bind(this)

        this.state = {
            dots: 0,
            maxDots: maxDots,
            interval: interval
        }

        this._interval = setInterval(this.tick, interval)
    }

    componentWillUnmount() {
        clearInterval(this._interval)    
    }

    render() {
        return (
            <div className="elipses-wrap">
                {this.props.text}
                <span className="elipses">
                    {'.'.repeat(this.state.dots)}
                </span>
            </div>
        )
    }

    tick() {
        this.setState(({dots, maxDots}) => {
            return {
                dots: dots < maxDots ? ++dots : 0
            }
        })
    }
}

Elipses.defaultProps = {
    maxDots: 3,
    interval: 300
}

Elipses.propTypes = {
    maxDots: PropTypes.number,
    interval: PropTypes.number
}
