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

{/*
           <Recaptcha
              ref={e => this._recaptcha = e}
              sitekey="6Ldp2bsSAAAAAAJ5uyx_lx34lJeEpTLVkP5k04qc"
              size="compact"
              render="explicit"
              theme="dark"
              verifyCallback={() => console.log("verifyCallback", arguments)}
              onloadCallback={() => console.log("onloadCallback", arguments)}
              expiredCallback={() => console.log("expiredCallback", arguments)}
            />*/}
{/*           <script src="https://www.google.com/recaptcha/api.js" async defer></script>
*/}
            {/* Kind of works:

            <Recaptcha2 siteKey={siteKey}/>
            */}


            {/*<div dangerouslySetInnerHTML={this.captchaIFrame}/>*/}
            <iframe src="https://www.google.com/recaptcha/api2/anchor?k=6Ldp2bsSAAAAAAJ5uyx_lx34lJeEpTLVkP5k04qc&co=aHR0cDovL2JvYXJkcy40Y2hhbi5vcmc6ODA.&amp;hl=en&amp;v=r20171011122914&amp;theme=dark&amp;size=normal&amp;cb=5dmlh0tzrhkb"
              title="recaptcha widget" width="304" height="78" frameborder="0" scrolling="no"
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox">
            </iframe>

            {/*<iframe src="https://www.google.com/recaptcha/api2/anchor?k=6Ldp2bsSAAAAAAJ5uyx_lx34lJeEpTLVkP5k04qc&amp;co=aHR0cDovL2JvYXJkcy40Y2hhbi5vcmc6ODA.&amp;hl=en&amp;v=r20171011122914&amp;theme=light&amp;size=normal&amp;cb=5dmlh0tzrhkb" title="recaptcha widget" width="304" height="78" frameborder="0" scrolling="no" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox"></iframe>*/}

            {/*<script src="https://www.google.com/recaptcha/api.js" async defer></script>
            <div className="g-recaptcha" data-sitekey="6Ldp2bsSAAAAAAJ5uyx_lx34lJeEpTLVkP5k04qc"></div>*/}

{/*            <iframe src="https://www.google.com/recaptcha/api/challenge?k=6Ldp2bsSAAAAAAJ5uyx_lx34lJeEpTLVkP5k04qc"
                frameBorder="0" scrolling="no" allow-scripts allow-popups allow-forms
                style={{width: "302px", height: "422px", borderStyle: "none"}}>
            </iframe>
*/}

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

    get captchaIFrame() {
        return {
          __html: `
            <iframe src="https://www.google.com/recaptcha/api2/anchor?k=6Ldp2bsSAAAAAAJ5uyx_lx34lJeEpTLVkP5k04qc&co=aHR0cDovL2JvYXJkcy40Y2hhbi5vcmc6ODA.&amp;hl=en&amp;v=r20171011122914&amp;theme=dark&amp;size=normal&amp;cb=5dmlh0tzrhkb"
              title="recaptcha widget" width="304" height="78" frameborder="0" scrolling="no"
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox">
            </iframe>
          `
            // <iframe src="https://www.google.com/recaptcha/api/fallback?k=${siteKey}"
            //     frameBorder="0" scrolling="no" allow-scripts allow-popups allow-forms
            //     style={{width: "302px", height: "422px", borderStyle: "none"}}>
            // </iframe>
        }
    }
}

export default PostForm



class Recaptcha2 extends Component {

    componentDidMount() {
      if (window.grecaptcha) {
        console.error("Recaptcha exists - rendering...");

        grecaptcha.render(this._container, {
          theme: "dark",
          sitekey: this.props.siteKey
        })
      } else {
        console.error("No Recaptcha")
      }
    }
    render() {
      return <div id="g-recaptcha" ref={ref => this._container = ref}/>
    }
}

// https://www.google.com/recaptcha/api2/anchor?k=6Ldp2bsSAAAAAAJ5uyx_lx34lJeEpTLVkP5k04qc&co=ZmlsZTo.&hl=en&v=r20171011122914&theme=dark&size=normal&cb=xpcdl3c8wq5y
// https://www.google.com/recaptcha/api2/anchor?k=6Ldp2bsSAAAAAAJ5uyx_lx34lJeEpTLVkP5k04qc&co=aHR0cDovL2JvYXJkcy40Y2hhbi5vcmc6ODA.&amp;hl=en&amp;v=r20171011122914&amp;theme=light&amp;size=normal&amp;cb=5dmlh0tzrhkb" title="recaptcha widget" width="304" height="78" frameborder="0" scrolling="no" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox"></iframe>
