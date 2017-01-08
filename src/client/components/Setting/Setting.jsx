import React, { Component } from 'react'
import classNames from 'classnames'


export default class Setting extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    const { type, title, value, desc, key } = this.props.setting;

    return (
      <div className="setting">
        <span className="key">{title}</span>
        <span className="value">{String(value)}</span>
        <div className="description">{desc}</div>
      </div>
    )
  }
}
