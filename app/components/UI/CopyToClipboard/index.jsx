import React, { Component } from 'react';
import { isFunction } from '~/utils/types';

class CopyToClipboard extends Component {
  render() {
    const { value, ...restProps } = this.props;
    return (
      <div
        {...restProps}
        onClick={this.onClick}
      />
    );
  }

  onClick = (e) => {
    e.stopPropagation();

    const { onClick, value } = this.props;

    const valueToCopy = value ? value : this.getSelectionText();

    this.copyToClipboard(valueToCopy);

    isFunction(this.props.onClick) && this.props.onClick(valueToCopy)

  }

  copyToClipboard(text) {
      // https://stackoverflow.com/a/33928558
      var textarea = document.createElement("textarea");
      textarea.textContent = text;
      textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
      document.body.appendChild(textarea);
      textarea.select();
      try {
          document.execCommand("copy");  // Security exception may be thrown by some browsers.
          console.log(`Copied ${text} to clipboard!`)
      } catch (ex) {
          console.warn("Copy to clipboard failed.", ex);
          return false;
      } finally {
          document.body.removeChild(textarea);
      }
  }

  getSelectionText() {
      // https://stackoverflow.com/a/5379408
      var text = "";
      if (window.getSelection) {
          text = window.getSelection().toString();
      } else if (document.selection && document.selection.type != "Control") {
          text = document.selection.createRange().text;
      }
      return text;
  }
}

export default CopyToClipboard;
