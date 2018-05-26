import React, { Component } from 'react'
import Recaptcha from 'react-recaptcha'
import {
    FileInput,
    TextField,
    TextArea,
    Icon,
    IconCircle,
    ButtonCircle,
} from '~/components';

const i = Lurka.icons;
const { siteKey } = Lurka.settings;

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
              onChange={this.handleInputChange}
            />
            <TextArea
              className="post-comment"
              name="comment"
              label="Comment"
              ref={this.setCommentRef}
              onChange={this.handleInputChange}
            />
           <Recaptcha
              ref={e => this._recaptcha = e}
              sitekey={siteKey}
              size="compact"
              render="explicit"
              theme="dark"
              verifyCallback={() => console.log("verifyCallback", arguments)}
              onloadCallback={() => console.log("onloadCallback", arguments)}
              expiredCallback={() => console.log("expiredCallback", arguments)}
            />
            <script src="https://www.google.com/recaptcha/api.js" async defer></script>
            <div className="g-recaptcha" data-sitekey="6Ldp2bsSAAAAAAJ5uyx_lx34lJeEpTLVkP5k04qc"></div>

            {/*<iframe src="https://www.google.com/recaptcha/api/fallback?k=6Ldp2bsSAAAAAAJ5uyx_lx34lJeEpTLVkP5k04qc"
                frameborder="0" scrolling="no"
                style={{width: "302px", height: "422px", "border-style": "none"}}>
            </iframe>*/}
            <div className="PostForm__decision">
                <FileInput className="post-file-wrapper"/>
                <button type="text" className="post-submit">
                    <Icon name={i.postSubmit}/>
                    <span className="text">Send</span>
                </button>
            </div>
          </form>
        )
    }
}

export default PostForm
