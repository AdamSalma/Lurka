import React, { PureComponent } from 'react';
import cx from 'classnames';
import './Modal.styles';

import {onModalOpen, onModalClose} from '~/events/subscribers';
import {emitOpenModal, emitCloseModal} from '~/events/subscribers';

import {isUndefined} from '~/utils/types';

class Modal extends PureComponent {
    /**
     * A generic Modal wrapper that can alter its contents through publish-subscribe events.
     */

    constructor(props) {
        super(props)

        if (props.acceptEventsFromId) {
            this.acceptEventsFromId = props.acceptEventsFromId
        } else {
            this.acceptAnyEvent = true
        }

        delete props.acceptEventsFromId

        this.initialState = {
            isOpen: false,
            ModalComponent: null,
            hasOverlay: true,
            overlayOpts: {}
        }

        this.state = this.initialState;
    }

    @onModalOpen
    onModalShow(opts) {
        if (this.shouldAcceptEvent(opts.id)) {
            this.setState({
                isOpen: true,
                ModalComponent: opts.Modal,
                hasOverlay: isUndefined(opts.hasOverlay)
                                ? true
                                : opts.hasOverlay,
                overlayOpts: opts.overlayOpts || {},
            })
        }
    }

    @onModalClose
    onModalClose({ id="any" }) {
        if (this.shouldAcceptEvent(id)) {
            // TODO: Add "closing" to state
            this.closeModal()
        }
    }

    closeModal() {
        this.setState(this.initialState);
    }

    shouldAcceptEvent(eventId) {
        if (!eventId) {
            throw new Error(`Invalid Modal event id: ${eventId}. Check all calls for publishOpenModal`)
        }

        if (!this.acceptAnyEvent && this.acceptEventsFromId !== eventId) {
            console.warn(`Modal ${this.acceptEventsFromId} rejected event with ID: ${eventId}`);
            return false
        }

        return true
    }

    render() {
        if (!this.state.isOpen)
            return null

        const { className, ...restProps } = this.props;
        const { hasOverlay, overlayOpts, ModalComponent, isOpen, } this.state;

        return this.state.isOpen ? (
            <div className={cx("Modal")} {...restProps}>
                {this.state.hasOverlay &&
                    <Overlay {...this.state.overlayOpts} onClick={this.handleOverlayClick}/>}
                <div className="Modal__Content">
                    {this.state.ModalComponent}
                </div>
            </div>
        ) : null;
    }

    handleOverlayClick(e) {
        this.closeModal()
    }
}

Modal.displayName = 'Modal';

export default Modal;
