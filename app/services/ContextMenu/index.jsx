/**
 * Subscribes to an event and renders a context menu outside of the current app
 * DOM tree.
 *
 * This is so the context menu can be above everything z-index wise
 *
 * The context menu is removed when a click bubbles up to the window. If you want
 * to keep the menu open, use `e.stopPropagation()` on your component to block
 * the click from traveling up
 */
import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import {isFunction} from '~/utils/types';

// import './styles';
import ServiceComponent from '../ServiceComponent'
import { onOpenContextMenu, onCloseContextMenu } from '~/events'

class ContextMenuService extends ServiceComponent {

    constructor(props) {
        super(props);

        this.status = {
            isOpen: false,
            menuEl: null,
            eTarget: null
        }
    }

    @onOpenContextMenu
    onOpenContextMenu(props) {
        const { isOpen, eTarget, menuEl } = this.status

        if (isOpen) {
            if (props.event.target === eTarget) {
                // reference is the same; reposition instead of close/open
                // (for animation)
                this.positionContextMenu(menuEl, props.event)
            } else {
                this.closeContextMenu()
                this.openContextMenu(props)
            }
        } else {
            this.openContextMenu(props)
        }
    }

    @onCloseContextMenu
    onCloseContextMenu() {
        if (this.status.isOpen) {
            console.highlight("closeContextMenu")
            this.closeContextMenu();
        } else {
            console.warn("ContextMenu close rejected")
        }
    }

    openContextMenu({ event, ContextMenu }) {
        event.preventDefault();
        event.stopPropagation();
        event.persist();

        console.log("Context Menu opening...")
        const menuEl = this.createMenuElement();

        ReactDOM.render(ContextMenu, menuEl, () => {
            this.status = {
                menuEl,
                isOpen: true,
                eTarget: event.target
            }
            this.positionContextMenu(menuEl, event);
            this.registerCloseEvent();
            console.info("ContextMenu opened")
        });
    }

    createMenuElement() {
        if (this.status.menuEl) {
            console.warn("ContextMenuWrapper already exists - wasn't closed properly");
            return this.status.menuEl;
        }

        const wrap = document.createElement('div');
        wrap.className = "ContextMenuWrapper";
        document.body.appendChild(wrap);

        return wrap;
    }

    registerCloseEvent() {
        // Close the menu when a click bubbles up
        // To keep the menu open, use e.stopPropagation()
        window.addEventListener("click", this.handleClick, false);
    }

    handleClick = (e) => {
        window.removeEventListener("click", this.handleClick, false);
        this.closeContextMenu()
        this._clickListener = undefined
    }

    positionContextMenu( menu, event ) {
        const rect = menu.getBoundingClientRect();
        const { clientX: x, clientY: y } = event;
        const { innerHeight, innerWidth } = window

        console.log("positioning menu")
        let top, left;

        top = y + 2 // 2px spacing from cursor
        left = x + 2

        if (top + rect.height > innerHeight) {
            // Y overflows
            top -= rect.height + 4
        }
        if (left + rect.width > innerWidth) {
            // X overflows
            left -= rect.width + 4
        }

        menu.style.top = top + "px"
        menu.style.left = left + "px"
    }

    closeContextMenu = (callback) => {
        const { menuEl } = this.status;

        if (menuEl) {
            menuEl.parentNode.removeChild(menuEl);
            this.status.menuEl = null;
        } else {
            console.error("ContextMennu DOM reference does not exist.", this.status)
        }

        this.status.isOpen = false;

        isFunction(callback) && callback();
    }
}

export default ContextMenuService;
