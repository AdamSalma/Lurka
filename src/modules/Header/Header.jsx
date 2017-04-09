import './Header.styles'

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Sidebar from './Sidebar'
import SidePanels from './SidePanels'
import { bindMembersToClass } from '~/utils'

class Header extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            activePanel: null
        }

        bindMembersToClass(this, 'togglePanel')
    }

    render() {
        return (
            <div className="Header">
                <Sidebar 
                    togglePanel={this.togglePanel}
                />
                <SidePanels
                    activePanel={this.state.activePanel}
                />
            </div>
        );
    }

    togglePanel(panel) {
        this.setState( state => {
            return {
                activePanel: state.panel === panel ? null : panel
            }
        })
    }
}


function mapStateToProps({ status, board }) {
    return {    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({

    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
