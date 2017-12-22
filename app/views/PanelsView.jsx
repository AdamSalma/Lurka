import React, { Component } from 'react';
import cx from 'classnames'

import { Panels } from '~/containers'

import {
    onHeaderPanelOpen,
    onHeaderPanelClose,

    emitOpenHeaderPanel,
    emitCloseHeaderPanel,

    onHeaderExpand,
    onHeaderShrink
} from '~/events';

import {isFunction} from '~/utils/types';

export class PanelsView extends Component {
    modalstate = {
        isPreparingToOpen: false,
        isOpening: false,
        isOpen: false,
        id: null
    }

    @onHeaderPanelOpen
    onHeaderPanelOpen({ panelID, closeIfOpen=false }) {
        console.log("onHeaderPanelOpen()")
        const HeaderPanel = this.getHeaderPanel(panelID);

        if (this.modalstate.isOpen && this.modalstate.id === panelID) {
            if (closeIfOpen) {
                this.closePanel()
            } else {
                console.warn(`Panel '${panelID}' is already open.`)
            }

            return
        }

        this.modalstate.id = panelID

        if (this.modalstate.isOpen) {
            return this.closePanel(() => this.prepareToOpen(HeaderPanel))
        }

        this.prepareToOpen(HeaderPanel);
    }

    @onHeaderPanelClose
    onHeaderPanelClose(callback) {
        console.log("onHeaderPanelClose()")

        if (this.modalstate.isOpen) {
            this.closePanel(callback)
        } else {
            isFunction(callback) && callback()
            console.warn("onHeaderPanelClose rejected. No modal was open to be closed.")
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            HeaderPanel: null,
            isHeaderExpanded: true  // is expanded by default
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.modalstate.isPreparingToOpen) {
            // Open on next tick - otherwise doesn't animate
            setTimeout(this.openPanel, 2);
        }
    }

    setHeaderPanelRef = (ref) => {
        if (ref && ref.getWrappedInstance) {
            this._panel = ref.getWrappedInstance()
        } else {
            this._panel = ref;
        }
    }

    render() {
        const { isHeaderExpanded, HeaderPanel } = this.state
        const classNames = cx('View', 'PanelsView', {
            "PanelsView--header-expanded": isHeaderExpanded
        });


        return (
            <section className={classNames}>
                {HeaderPanel &&
                    <HeaderPanel
                      ref={this.setHeaderPanelRef}
                      closePanel={this.closePanel}
                      isHeaderExpanded={isHeaderExpanded}
                    />
                }
            </section>
        );
    }

    prepareToOpen(HeaderPanel) {
        console.log("prepareToOpen()")
        this.modalstate.isPreparingToOpen = true;
        this.setState({HeaderPanel});
    }

    openPanel = (callback) => {
        this._panel && this._panel.show({
            callback: () => this.handlePanelOpen(callback)
        });
    }

    closePanel = (callback) => {
        console.log("closePanel()")
        this._panel && this._panel.hide({
            callback: () => this.onPanelHidden(callback)
        });
    }

    handlePanelOpen(callback) {
        console.log("modalstate.isOpen = true");
        this.modalstate.isOpen = true
        this.modalstate.isPreparingToOpen = false;
        isFunction(callback) && callback()
    }

    onPanelHidden( callback ) {
        this.modalstate.isOpen = false;
        this.unmountHiddenPanel( callback );
    }

    getHeaderPanel(panelID) {
        switch (panelID) {
            case "watcher":
                return Panels.WatchPanel
            case "bookmarks":
                return Panels.BookmarksPanel
            case "downloads":
                return Panels.DownloadsPanel
            case "settings":
                return Panels.SettingsPanel
            case "menu":
                return Panels.MenuPanel
            default:
                throw new Error(`${panelID} is not a valid panel ID`)
        }
    }

    unmountHiddenPanel(callback) {
        if (isFunction(callback)) {
            this.setState({ HeaderPanel: null }, callback)
        } else {
            this.setState({ HeaderPanel: null })
        }
    }

    @onHeaderExpand
    onHeaderExpand() {
        this.setState({isHeaderExpanded: true});
    }

    @onHeaderShrink
    onHeaderShrink() {
        this.setState({isHeaderExpanded: false});
    }
};

PanelsView.displayName = 'PanelsView';

export default PanelsView;
