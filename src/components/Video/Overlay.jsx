import React, { Component } from 'react';
import Icon from '../Icon'
import Spinner from '../Spinner'

export default class Overlay extends Component {
    renderContent () {
        const {
            error,
            paused,
            loading
        } = this.props;
        // const iconProps = {
        //     className: styles.icon,
        //     height: 40,
        //     width: 40,
        //     fill: '#fff'
        // };
        
        if (!error && !loading && !paused)
            return null

        return <span className="overlay-icon">
            { error ? <Icon name="alert-octagon"/>
                : loading ? <Spinner />
                    : paused ? <Icon name="play"/>
                        : null
            }
        </span>
    }

    render () {
        const { onClick } = this.props;
        return (
            <div className="video-overlay"
            onClick={onClick}>
                { this.renderContent() }
            </div>
        );
    }
}
