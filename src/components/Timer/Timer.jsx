import React, {PureComponent, PropTypes} from 'react'

export default class Timer extends PureComponent {

    constructor({seconds, interval, active, autoreset}) {
        super();

        this.state = {
            // TODO: Timer default props
            seconds, active, autoreset
        }

        this.interval = interval || 1000  // default props here too

        this.tick = this.tick.bind(this)
        this.setInterval = this.setInterval.bind(this)
        this.clearInterval = this.clearInterval.bind(this)

        if (active) {
            this._interval = setInterval(this.tick, this.interval)
        }

    }

    componentWillReceiveProps({active}) {
        if (this.state.active !== active) {
            active ? this.setInterval() : this.clearInterval()
        }
    }

    componentWillUnmount() {
        this.clearInterval()
    }

    render() {
        const { seconds, displayCounter } = this.props
        const { active } = this.state

        return active && displayCounter ?
            <span className="timer">{seconds}</span>
            : false
    }

    tick() {
        this.setState( ({seconds, autoreset}) => {
            let state = {}

            if (seconds <= 0) {
                this.props.onTimerEnd()

                if (autoreset) {
                    state.seconds = this.props.seconds
                }
                else {
                    this.clearInterval()
                }
            }
            else {
                state.seconds = --seconds
            }

            return state
        }, this.props.onTick)  // callback
    }

    setInterval() {
        this._interval = setInterval(this.tick, this.interval)
        this.setState({
            active: true
        })
    }

    clearInterval() {
        clearInterval(this._interval)
        this.setState({
            active: false
        })
    }
}


Timer.defaultProps = {
    interval: 1000,
    active: true,
    autoreset: false,
    displayCounter: true,
    onTick: ()=>{}
}

Timer.propTypes = {
    onTimerEnd: PropTypes.func,
    seconds: PropTypes.number,

    interval: PropTypes.number,
    active: PropTypes.bool,
    autoreset: PropTypes.bool
}
