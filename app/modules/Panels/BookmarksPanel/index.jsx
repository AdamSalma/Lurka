import React, { Component } from 'react';
import cx from 'classnames';
import './styles';

import {ClassTransition} from '../components';
import {emitCloseHeaderPanel} from '~/events';

class BookmarksPanel extends Component {
    constructor(props) {
        super(props);
    }

    setTransitionerRef = (ref) => this.transitioner = ref;

    // Used by parent to control UI
    show (args){ this.transitioner.show(args) }
    hide (args){ this.transitioner.hide(args) }

    render() {
        const { className, } = this.props;
        console.warn("BookmarksPanel.render()")
        return (
            <ClassTransition effect="fade scale" ref={this.setTransitionerRef} className="BookmarksPanel" onClick={emitCloseHeaderPanel}>
                <h2>
                    BookmarksPanel!
                </h2>
            </ClassTransition>
        );
    }


}

export default BookmarksPanel;
