import React, { PureComponent } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';

@connect(state => ({
    theme: state.settings.theme
}))
class ThemeProvider extends PureComponent {
    render() {
        const theme = this.props.theme
        const currentTheme = cx({
            'Theme--Light': theme === "light",
            'Theme--Dark': theme === "dark"
            // Will add more in time...
        })

        return (
            <div className={currentTheme}>
                {this.props.children}
            </div>
        );
    }
}

export default ThemeProvider;
