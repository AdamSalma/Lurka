import './Footer.styles';

import React, {
    PureComponent,
    PropTypes
} from 'react';

import cx from 'classnames';

import {
    HeaderItem as FooterSpacer,
    LogoText,
    SearchBar,
    Icon,
    Pipe
} from '~/components';

import {
    emitContentViewToggle
} from '~/events/publishers';

const i = window.appSettings.icons;

const TitledIcon = ({ name, title }) => {
    return <div>
        <Icon name={name}/>
        <span>{title}</span>
    </div>
}

class Footer extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {
            toggleContentNav,
            cycleContentNav,
            toggleDrawer,
            togglePanel,
            boardID,
            threadID,
            isThreadOpen,
            isDrawerOpen,
            activePanel,
            boardList
        } = this.props

        const footerClasses = cx('Footer', {
            'drawer-open': isDrawerOpen
        })

        // TODO: Use selector for this:
        const footerTitle = boardList.items.length && boardList.items.find(b => b.boardID === boardID).short_desc

        return (
            <div className={footerClasses}>
              <div className='background' />
              <div className='content'>
                <FooterSpacer className='Footer--left'>
                    Board Stats:  151 / 1583 / 356
                </FooterSpacer>
                <FooterSpacer className='Footer--center Footer__search'>
                  <SearchBar placeholder={`Search /${boardID}/`} />
                </FooterSpacer>
                <FooterSpacer className='Footer--right'>
                  <TitledIcon name={i.footerSort} title='Sort'/>
                  <Pipe className="Footer__Pipe"/>
                  <TitledIcon name={i.footerFilter} title='Filter'/>
                  <Pipe className="Footer__Pipe"/>
                  <TitledIcon name={i.footerLayout} title='Layout'/>
                </FooterSpacer>
              </div>
            </div>
        )
    }
                // <FooterSpacer className='Footer--right'>
                //   <Icon name={i.footerInfo} />
                //   <Icon name={i.footerClose} />
                // </FooterSpacer>
}

export default Footer;

