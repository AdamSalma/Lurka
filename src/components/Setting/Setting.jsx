import React, { PureComponent } from 'react'
import classes from 'classnames'


export default class Setting extends PureComponent {
  constructor(props) {
    super(props);
  }

  render(){
    const { type, title, value, desc } = this.props.setting;

    return (
      <div className="setting">
        <span className="name">{title}</span>
        <span className="value">{String(value)}</span>
        <div className="description">{desc}</div>
      </div>
    )
  }
}
