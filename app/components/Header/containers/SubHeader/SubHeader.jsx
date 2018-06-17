import React, {
    PureComponent,
    PropTypes
} from 'react';
import cx from 'classnames';

import './SubHeader.styles';

import {
    HeaderGroup,
    TitledIcon,
    HeaderButtonIcon } from '../../components';
import { SearchBarWithIcons } from '~/components/UI';

import {onSubHeaderToggle} from '~/events/subscribers';

import { Button, Icon } from '~/components/UI';

// TODO: Is this needed?
import {emitContentViewToggle} from '~/events/publishers';

import { bindMembersToClass } from '~/utils/react';
import { isFunction } from '~/utils/types';

const i = Lurka.icons;
const {subheaderHeight, headerHeight} = Lurka.settings

class SubHeader extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            isOpen: true
        }


        // TODO: Remove this. Dynamic Header handles animation

        // this.animateInStyles = {
        //     translateY: subheaderHeight,
        //     translateZ: 0,
        //     opacity: 1,
        // }

        // this.animateInOpts = {
        //     duration: 400,
        //     easing: [0, 0, 0.2, 1]
        // }

        // this.animateOutStyles = {
        //     translateY: 0,
        //     translateZ: 0,
        //     opacity: 0,
        // }

        // this.animateOutOpts = {
        //     duration: 375,
        //     easing: [0.25, 0.46, 0.45, 0.94],
        // }
    }

    render() {
        const {
            boardID,
            threadID,
            boardList,
            searchBoard,
            navbarTitle
        } = this.props

        return <div className="SubHeader" ref={r => (this._subheader = r)}>
            <div className="background" />
            <div className="content">

              <div className="segment navigation">
                <span className="title-group" onClick={this.onMenuClick}>
                    <span className="title">{navbarTitle} </span>
                    <Icon className="down-icon" name={"chevron-down"/* i.navbarMenu */} />
                    {/* <Icon className="menu-icon" name={"chevron-right"/* i.navbarMenu */}
                </span>
                <Button>Archive</Button>
              </div>

              <div className="segment toolbar">
                <HeaderGroup className="SubHeader--center SubHeader__search">
                  <SearchBarWithIcons placeholder="Search Board" onChange={searchBoard} />
                </HeaderGroup>
                {/* <SearchBarWithIcons placeholder="Search" /> */}

                {/* <HeaderGroup className="SubHeader--left" /> */}
                {/* <HeaderGroup className="SubHeader--right" /> */}
              </div>

              <div className="segment settings">
                    <Button>Filter <Icon name="chevron-down"/></Button>
                    <Button>Sort by <span style={{color: "#fff", paddingLeft: "1em"}}>Bump order</span> <Icon name="chevron-down"/></Button>
                    {/* <Icon name={i.subheaderToolbarRefresh} title="Refresh" /> */}
                    <Icon className="watch-toolbar-icon" name={i.navbarEye} title="Refresh" />
                {/* <Button>Sort</Button>
                <Button>Filter</Button>
                <Button>To Top</Button> */}
                {/* <Icon name={i.subheadertoolbarsettings} title="Settings" /> */}
              </div>
            </div>
          </div>;
    }

            // <div className='content'>
            //     <HeaderGroup className='SubHeader--left'>
            //         <Icon name="android-lock"/>
            //         <Pipe className="SubHeader__Pipe"/>
            //         <TitledIcon name={i.navbarCompose} title='New Post'/>
            //         <Pipe className="SubHeader__Pipe"/>
            //         <TitledIcon name={i.navbarRefresh} title='Refresh'/>
            //     </HeaderGroup>
            //     <HeaderGroup className='SubHeader--center SubHeader__search'>
            //       <SearchBar placeholder={`Quick search`} onChange={searchBoard}/>
            //     </HeaderGroup>
            //     <HeaderGroup className='SubHeader--right'>
            //       <TitledIcon name={i.footerSort} title='Sort'/>
            //       <Pipe className="SubHeader__Pipe"/>
            //       <TitledIcon name={i.footerFilter} title='Filter'/>
            //       <Pipe className="SubHeader__Pipe"/>
            //       <TitledIcon name={i.footerLayout} title='Layout'/>
            //     </HeaderGroup>
            //   </div>

    onMenuClick() {
        emitMenuToggle();
    }

    // @onSubHeaderToggle
    // onSubHeaderToggle(override, customAni, callback) {
    //     let willBeOpen;

    //     if (override !== undefined) {
    //         if (override === this.state.isOpen)
    //             return
    //         willBeOpen = !!override
    //     } else {
    //         willBeOpen = !this.state.isOpen
    //     }

    //     const options = Object.assign(willBeOpen ? this.animateInOpts : this.animateOutOpts, customAni);
    //     const styles = willBeOpen ? this.animateInStyles : this.animateOutStyles;

    //     options.complete = () => {
    //         this.setState({isOpen: willBeOpen});
    //         isFunction(callback) && callback();
    //     }

    //     this.animate(styles, options);
    // }

    // animate(styles, options) {
    //     this._subheader && $(this._subheader).velocity(styles, options);
    // }
}

export default SubHeader;


                // <HeaderGroup className='SubHeader--right'>
                //   <Icon name={i.footerInfo} />
                //   <Icon name={i.footerClose} />
                // </HeaderGroup>
