import './ButtonCircle.styles'
import React, {PureComponent} from 'react'
import classes from 'classnames'

import Circle from './Circle'

class ButtonCircle extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isToggled: false
        }

        this.handleClick = this.handleClick.bind(this)
    }

    render() {
        const controlClasses = classes('ButtonCircle', this.props.className, {
            "selected": this.props.isActive
        })

        return (
            <div className={controlClasses} onClick={this.handleClick}>
                <Circle/>
                {this.props.toggleProps && this.renderChildren() || this.props.children}
            </div>
        )
    }

    renderChildren() {
        const { children, toggleProps } = this.props

        if (this.state.isToggled) {
            return React.Children.map(children, child => {
                return React.cloneElement(child, toggleProps)
            })
        } else {
            return children
        }
    }

    handleClick(e) {
        console.log("ButtonCircle.handleClick")
        e.stopPropagation();
        this.setState({isToggled: !this.state.isToggled}, () => {
            if (this.props.onClick) {
                console.log("triggering callback onClick");
                this.props.onClick(e)
            }
        })
    }
}


export default ButtonCircle
