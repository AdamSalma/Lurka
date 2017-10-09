import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';

// import './styles';
import { ServiceComponent } from '~/components'
import { onOpenContextMenu, onCloseContextMenu } from '~/events'

class ContextMenu extends ServiceComponent {
    state = {
        isOpen: false,
        name: null,
        reference: null
    }

    @onOpenContextMenu
    onOpenContextMenu({Component}) {
        if (this.state.isOpen) {
            this.closeContextMenu(() => {
                this.openContextMenu(Component)
            })
        } else {
            this.openContextMenu(Component)
        }
    }

    @onCloseContextMenu
    onCloseContextMenu() {
        if (this.state.isOpen) {
            this.closeContextMenu()
        }
    }

    openContextMenu( Component ) {
        const element = document.createElement('div');
        element.className = "ContextMenuWrapper";

        document.body.appendChild(element);
        ReactDOM.render(Component, element, () => {
            this.state.reference = element;
            this.state.name = name;
            this.positionContextMenu(element);
        });
    }

    positionContextMenu( reference ) {
        const rect = reference.getBoundingClientRect();
        reference.top = rect.top
        reference.left = rect.left
    }

}

export default ContextMenu;
