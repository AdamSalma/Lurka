import React, { Component } from 'react';
import cx from 'classnames';

import './styles';
import { SlideTransition } from '../components'
import { Icon, Button, SearchBarWithIcons, Overlay } from '~/components/UI'
import * as Pages from './containers';

const i = Lurka.icons;

class MenuPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "boards"
        }
    }

    // Used by parent to control UI
    show = (args) => {
        this.overlay.show();
        setTimeout(() => this.transitioner.show(args), 150)

    }
    hide = (args) => {
        this.transitioner.hide(args);
        this.overlay.hide();
    }
    setTransitionerRef = (ref) => this.transitioner = ref;
    setOverlayRef = (ref) => this.overlay = ref;

    render() {
        const { className, isHeaderExpanded} = this.props;

        const classes = cx('MenuPanel', className, {
            "Header--expanded": isHeaderExpanded
        });

        return (
            <div style={{zIndex: -100}}>
            <SlideTransition
              effect="from top"
              className={classes}
              ref={this.setTransitionerRef}>
                <ul className="icon-gutter">
                    <li><Icon name={i.navbarSettings}/></li>
                    <li><Icon name={i.navbarSettings}/></li>
                    <li><Icon name={i.navbarSettings}/></li>
                    <li className="push-up"><Icon name={i.navbarSettings}/></li>
                    <li><Icon name={i.navbarSettings}/></li>
                </ul>
                <div className="content">
                    {this.getPage(this.state.page)}
                </div>
            </SlideTransition>
            <Overlay ref={this.setOverlayRef} style={{ width: "100vw", height: "100vh" }} onClick={this.props.closePanel} />
            </div>
        );
    }

    getPage(page) {
        switch(page) {
            case "boards":
            default:
                return <Pages.BoardListPage />
        }
    }
}

// export default withTransition({
//     type: "slide",
//     effect: "from left"
// })(MenuPanel);

export default MenuPanel
