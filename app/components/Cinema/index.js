import React, { Component } from 'react';
import connect from './connect'
import cx from 'classnames';
import utils from '~/utils'

import './styles';
import * as config from './config'
import CinemaInterface from './CinemaInterface'
import {CurrentMedia as Media} from './components'
import {Overlay} from '~/components'

class Cinema extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hideInterface: true
        }

        this.handleMouseMove = utils.throttle.invokeThenIgnoreForPeriod(200,
            this.handleMouseMove
        )

        this.timeoutRef = null

    }

    render() {
        if (!this.props.isActive) {
            return null
        }

        console.warn("Cinema RENDER")

        const { timeline, cycleCinemaTimeline } = this.props;

        return (
            <div className='Cinema'
                onMouseMove={this.handleMouseMove}>
                <Overlay onClick={this.closeCinema} />
                <CinemaInterface
                    hidden={this.state.hideInterface}
                    timeline={timeline}
                    closeCinema={this.closeCinema}
                    cycleTimeline={cycleCinemaTimeline}
                    >
                    {this.renderMedia(timeline)}
                </CinemaInterface>
            </div>
        );
    }

    renderMedia({ current }) {

        console.log("Current media:", current)
        if (current){
            return <Media {...current}/>
        }

        return "NO MEDIA PLACEHOLDER"
    }

    handleMouseMove = (e) => {
        if (this.timeoutRef) {
            clearTimeout(this.timeoutRef)
        }

        if (this.state.hideInterface) {
            this.setState({
                hideInterface: false
            })
        }

        this.timeoutRef = setTimeout(() => {
            if (!this.state.hideInterface) {
                this.setState({
                    hideInterface: true
                })
            }
        }, config.interfaceFadeOutDelay)
    }

    closeCinema = () => {
        this.props.toggleCinema(false)
    }
}

export default connect(Cinema);
