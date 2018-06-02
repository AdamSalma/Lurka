import React, { Component } from 'react';
import cx from 'classnames';

import './styles';
import { SlideTransition } from '../components'
import { Icon, Button, SearchBarWithIcons } from '~/components/UI'
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
    show = (args) => this.transitioner.show(args);
    hide = (args) => this.transitioner.hide(args);
    setTransitionerRef = (ref) => this.transitioner = ref;

    render() {
        const { className, isHeaderExpanded} = this.props;

        const classes = cx('MenuPanel', className, {
            "Header--expanded": isHeaderExpanded
        });

        return (
            <SlideTransition
              effect="from left"
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
