import React, { Component } from 'react';
import cx from 'classnames';

import {
    PreviousMediaButton,
    NextMediaButton,
    CloseCinema
} from './components';

class CinemaInterface extends Component {
    render() {
        const { className, hidden, timeline, children, closeCinema } = this.props;

        const classes = cx({
            "CinemaInterface--hidden": hidden
        })

        return (
            <div className='CinemaInterface'>
                {children}
                <PreviousMediaButton disabled={!timeline.previous.length} className={classes} onClick={this.cyclePrevious}/>
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
