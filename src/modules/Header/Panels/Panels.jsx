import React, { Component, PropTypes } from 'react';

class Panels extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            activePanel: null
        }
    }

    render() {
        switch (this.state.activePanel) {
            default:
                return null
        }
    }
}

export default Panels;
