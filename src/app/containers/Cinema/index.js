import React, { Component } from 'react';
import connect from './connect'
import cx from 'classnames';
import utils from '~/utils'

import './styles';
import * as config from './config'
import CinemaInterface from './CinemaInterface'
import {CurrentMedia as Media} from './components'

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

        const { timeline, cycleCinemaTimeline, toggleCinema } = this.props;

        return (
            <div className='Cinema'
                onMouseMove={this.handleMouseMove}>

                <CinemaInterface
                    hidden={this.state.hideInterface}
                    timeline={timeline}
                    closeCinema={() => toggleCinema(false)}
                    cycleTimeline={cycleCinemaTimeline}
                    >
                    {this.renderMedia(timeline)}
                </CinemaInterface>
            </div>
        );
    }

    renderMedia({ current }) {
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
}

export default connect(Cinema);
