import React, { Component, PropTypes } from 'react';
import BoardSelection from '~/modules/BoardSelection';
// import {onSelectionViewToggle} from '~/events/subscribers';
import {bindMembersToClass} from '~/utils/react';

class SelectionView extends Component {
        constructor(props) {
        super(props);

        // isVisible: props.settings.activeView == "content"
        this.state = {
            isVisible:    false,
            hideDuration: 600,
            showDuration: 600,
            hideEasing:   [0.23, 1, 0.32, 1],
            showEasing:   [0.23, 1, 0.32, 1]
        }

        bindMembersToClass(this, 'toggleViewState');
    }

    // @onSelectionViewToggle
    onToggle() {
        console.log('SelectionView.onToggle(). isVisible:', this.state.isVisible)
        this.state.isVisible ? this.hide() : this.show();
    }

    hide() {
        this.toggleViewState()
        // $(this._view).velocity({
        //     top: window.innerHeight
        // }, {
        //     duration: this.state.hideDuration,
        //     easing:   this.state.hideEasing,
        //     complete: this.toggleViewState
        // });
    }

    show() {
        this.toggleViewState()
        // $(this._view).velocity({
        //     top: 0
        // }, {
        //     duration: this.state.showDuration,
        //     easing:   this.state.showEasing,
        //     complete: this.toggleViewState
        // });
    }

    toggleViewState() {
        this.setState({
            isVisible: !this.state.isVisible
        })
    }

    render() {
        if (!this.state.isVisible) {
            return false
        }

        return (
            <section ref={ref => this._view = ref} className={[
                'View SelectionView', this.props.className
            ].join(' ')}>
                <BoardSelection />
            </section>
        );
    }
}

export default SelectionView;
