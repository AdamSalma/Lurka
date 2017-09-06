import React, { Component } from 'react';
import cx from 'classnames';

import {
    PreviousMediaButton,
    NextMediaButton,
    CloseCinema
} from './components';

const i = window.appSettings.icons

class CinemaInterface extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { className, hidden, timeline, children, closeCinema } = this.props;

        const classes = cx({
            "CinemaInterface--hidden": hidden
        })

        return (
            <div className='CinemaInterface'>
                <PreviousMediaButton disabled={!timeline.previous.length} className={classes} onClick={this.cyclePrevious}/>
                {children}
                <NextMediaButton disabled={!timeline.next.length} className={classes} onClick={this.cycleNext}/>
                <CloseCinema onClick={closeCinema} className={classes}/>
            </div>
        );
    }

    cyclePrevious = () => {
        this.props.cycleTimeline({ cycleAmount: -1 })
    }

    cycleNext = () => {
        this.props.cycleTimeline({ cycleAmount: 1 })
    }
}

export default CinemaInterface;
