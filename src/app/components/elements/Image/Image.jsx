import React, {PureComponent} from 'react';
import classes from 'classnames'


class Image extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: !props.hideUntilLoaded
        }

        // Filter props and assign to image specific props
        let { hideUntilLoaded, loader, ...imageProps } = props;
        this.imageProps = Object.assign({}, imageProps)
    }

    render() {
        if (!this.state.isVisible)
            return this.renderPlaceholder(this.props)
        return <img {...this.imageProps}/>
    }

    renderPlaceholder(props) {
        // Use custom onload to reveal image, then trigger the users `onLoad`
        // as a callback to setState
        const imageProps = Object.assign({}, this.imageProps, {onLoad: this.onLoad})

        if (React.isValidElement(props.loader)) {
            return <div className="image-loading">
                <img {...imageProps}/>
                {props.loader}
            </div>
        }
        return <img {...imageProps}/>
    }

    onLoad = () => {
        this.setState({
            isVisible: true
        }, this.props.onLoad)
    }
}

Image.defaultProps = {
    hideUntilLoaded: false,
    loader: false
}

export default Image
