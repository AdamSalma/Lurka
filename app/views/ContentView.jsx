import React, {
    Component,
    PropTypes
} from 'react';

import {
    Board,
    Thread,
    Header,
    Settings as Drawer
} from '~/modules'

import { onContentViewToggle } from '~/events/subscribers';

const {headerHeight} = Lurka.settings


class ContentView extends Component {

    constructor(props) {
        super(props);

        // inView: props.settings.activeView == "content"
        this.state = {
            inView:       true,
            hideDuration: 600,
            showDuration: 600,
            hideEasing:   [0.23, 1, 0.32, 1],
            showEasing:   [0.23, 1, 0.32, 1]
        }
    }

    @onContentViewToggle
    onToggle() {
        console.log('ContentView.onToggle(). inView:', this.state.inView)
        this.state.inView ? this.hide() : this.show();
    }

    hide() {
        this.animate({
            translateY: window.innerHeight,
            translateZ: 0
        }, {
            duration: this.state.hideDuration,
            easing:   this.state.hideEasing,
            complete: this.toggleViewState
        });
    }

    show() {
        this.animate({
            translateY: 0,
            translateZ: 0
        }, {
            duration: this.state.showDuration,
            easing:   this.state.showEasing,
            complete: this.toggleViewState
        });
    }

    toggleViewState = () => {
        this.setState({
            inView: !this.state.inView
        })
    }

    render() {
        const {
            id,
            ...restProps
        } = this.props;

        return (
            <section
              {...restProps}
              ref={ref => this._view = ref}
              className='View ContentView'>
              <Header.containers.DynamicHeader />
              <Board />
              <Thread />
              <Drawer />
            </section>
        )
    }

    animate(styles, options) {
        this._view && $(this._view).velocity(styles, options);
    }
}

ContentView.displayName = 'ContentView';

ContentView.propTypes = {
    className: PropTypes.string,
};

export default ContentView;
