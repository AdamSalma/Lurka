import './Title.styles';
import React, { Component, PropTypes } from 'react';
import { Icon, Tooltip } from '~/components';
import cx from 'classnames'
import {bindMembersToClass} from '~/utils'

const i = window.appSettings.icons

class Title extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hovering: false
        }
        bindMembersToClass(this, 'handleMouseLeave', 'handleMouseEnter')
    }

    render () {
        const {
            className,
            children,
            onTitleClick,
            onCompose,
            onRefresh
        } = this.props;

        const titleClass = cx('Title', className, {
            'Title--hovering': this.state.hovering
        })

        return (
            <div className={titleClass}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}>
              <div className='Title__icon Title__icon--left'>
                <Tooltip content="Create Thread" position="bottom">
                    <Icon
                      name={i.navbarCompose}
                      onClick={onCompose} />
                </Tooltip>
              </div>
              <button
                className='button'
                onClick={onTitleClick}>
                {children}
              </button>
              <div className='Title__icon Title__icon--right'>
                <Tooltip content="Reload board" position="bottom">
                    <Icon
                      name={i.navbarRefresh}
                      onClick={onRefresh} />
                </Tooltip>
              </div>
            </div>
        )
    }

    handleMouseEnter() {
        this.setState({
            hovering: true
        });
    }

    handleMouseLeave() {
        this.setState({
            hovering: false
        });
    }
}

Title.displayName = 'Title';

export default Title;
