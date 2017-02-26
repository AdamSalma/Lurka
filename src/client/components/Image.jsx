import React, {Component} from 'react';
import classNames from 'classnames'


class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: !props.hideUntilLoaded
        }

        // Remove non-html properties to enable using `{...imageProps}`
        // Otherwise would have to specify every property. The horror.
        this.imageProps = Object.assign({}, props)
        delete this.imageProps['hideUntilLoaded']
        delete this.imageProps['loader']

        this.onLoad = this.onLoad.bind(this)
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

    onLoad() {
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
