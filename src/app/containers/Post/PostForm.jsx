import React, { Component } from 'react'
// import Recaptcha from 'react-recaptcha'
import {
    TextField,
    Icon,
    IconCircle,
    FileInput
} from '~/components';

const i = window.appSettings.icons;

class PostForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            options: '',
            comment: ''
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        if (!this.isFormValid()) {
            this.invalidateForm()
            return
        }

        const { name, options, comment } = this.state;

        this.props.onSubmit({
            name: name.trim(),
            options: options.trim(),
            comment: comment.trim()
        });

        this.setState({name: '', text: ''})
    }

    setNameRef = (ref) => this._inputName = ref
    setOptionsRef = (ref) => this._inputOptions = ref
    setCommentRef = (ref) => this._inputComment = ref

    appendToComment = ( text ) => {
        console.log(this._inputComment);
    }

    render() {
        const { className, close, header, theme } = this.props

        return (
          <form className={className} onSubmit={this.handleSubmit}>
            <div className="post-header">
                {header}
                <IconCircle className="post-close" name={i.postClose} onClick={close}/>
            </div>
            <TextField
                theme={theme}
                className="post-name"
                label="Name"
                name="name"
                placeholder="Anonymous"
                onChange={this.handleInputChange}
                ref={this.setNameRef}
            />
            <TextField
                theme={theme}
                className="post-options"
                label="Options"
                name="options"
                ref={this.setOptionsRef}
                onChange={this.handleInputChange}/>
            <textarea
              className="post-comment"
              name="comment"
              ref={this.setCommentRef}
              onChange={this.handleInputChange}
            />
           {/* <Recaptcha
              ref={e => this._recaptcha = e}
              sitekey={sitekey}
              size="compact"
              render="explicit"
              verifyCallback={verifyCallback}
              onloadCallback={callback}
              expiredCallback={expiredCallback}
            />*/}
            <FileInput className="post-file-wrapper"/>
            <div className="post-submit-wrapper">
                <Icon name={i.postSubmit}/>
            </div>
          </form>
        )
    }

    isFormValid() {
        // Needs access to the max chars and timeout

        // for now
        return true
    }

    invalidateForm() {
        // For now
        return

        this.setState({ showInvalidationMessage: true });

        setTimeout(() =>
            this.setState({
                 showInvalidationMessage: false
            }),
        config.invalidationMessageDuration)

    }
}

export default PostForm
