import React from 'react';
import ReactDOM from 'react-dom';

import { Icon, ExpandedImage } from '~/components';
import { Overlay } from '../';
import cx from 'classnames';
import utils from '~/utils';

import './styles'

const i = Lurka.icons;

class ThreadImage extends React.Component {
    constructor(props) {
        super(props);
        this.modal = {
            isExpanded: false,
            ref: null
        }
    }

    setImageRef = ref => this._image = ref;
    render () {
        const { className, src, thumbnail } = this.props;

        return (
            <div className="ThreadImage">
                <ExpandedImage
                  className="ThreadImage__image"
                  srcThumbnail={thumbnail}
                  srcExpanded={src}
                  setReference={this.setImageRef}
                />
                <Icon className="ThreadImage__icon"
                  name={i.threadMediaExpand}
                  onClick={this.handleClick}
                  title="Expand image"
                />
            </div>
        );
    };

    handleClick = (e) => {
        e.stopPropagation()

        if (this.modal.isExpanded) {
            this.closeImageModal(e)
        } else {
            this.openImageModal(e)
        }
    }

    openImageModal(e) {
        const domElement = this.createElement()
        const styles = this.calcOffsetStyles(e)
        const Modal = this.renderModal(styles)

        ReactDOM.render(Modal, domElement, this.onModalRendered)
    }

    onModalRendered = () => {
        // Show on next tick (otherwise no overlay fade)
        utils.time.nextTick(() => {
            this._overlay.show()
            this._image.classList.add('hide');
        })
    }

    createElement() {
        if (this.modal.ref) {
            console.warn("ThreadImage modal already exists - wasn't closed properly");
            return this.modal.ref;
        }

        const el = document.createElement('div');
        el.className = "ThreadImageModal";
        document.body.appendChild(el);

        this.modal.ref = el;

        return el;
    }

    setOverlayRef = (ref) => this._overlay = ref
    renderModal(style) {
        const { className, width, height, src, thumbnail } = this.props;

        return <div
          className="ThreadImageModal__contents"
          onClick={this.closeImageModal}
        >
            <Overlay ref={this.setOverlayRef}/>
            <ExpandedImage
              className="ThreadImageModal__image"
              srcThumbnail={thumbnail}
              srcExpanded={src}
              style={style}
            />
        </div>
    }

    calcOffsetStyles(e) {
        const rect = e.target.previousSibling.getBoundingClientRect();
        const { width: w, height: h } = this.props;
        const maxWidth = window.innerWidth, maxHeight = window.innerHeight;
        let width, height, offsetX, offsetY

        console.group("Image offset calculations")

        // *** Dimensions ***
        const sizeOverflows = w > maxWidth || h > maxHeight
        if (sizeOverflows) {
            const widthOverflowsMore = w / maxWidth > h / maxHeight;
            console.log("ratios", w/maxWidth, h/maxHeight)

            if (widthOverflowsMore) {
                console.warn("Width ratio is bigger");
                width = maxWidth;
                height = h * (maxWidth / w)
            } else {
                console.warn("Height ratio is bigger")
                height = maxHeight;
                width = w * (maxHeight / h)
            }
        } else {
            console.warn("Image Fits")
            width = w
            height = h
        }

        // Get image scale based on calculated dimensions
        const scale = rect.height / height

        // *** Offset ***
        // Get the scaled image's X/Y offsets
        const fromLeft = (maxWidth - rect.width) / 2
        const fromTop = (maxHeight - rect.height) / 2

        // Get difference and adjust by scale factor
        offsetX = (rect.left - fromLeft) / scale
        offsetY = (rect.top - fromTop) / scale

        console.log(`window ${maxWidth} x ${maxHeight}`);
        console.log("Thread Image: w", rect.width, "h", rect.height);
        console.log("Proper dimensions: w", w, "h", h);
        console.log("Calculated dimensions: w", width, "h", height);
        console.log("Calculated offset: x", offsetX, "y", offsetY);
        console.log("Image scale", scale);

        console.groupEnd()

        return {
            width: width + "px",
            height: height + "px",
            transform: `scale(${scale}) translateX(${offsetX}px) translateY(${offsetY}px)`
        }
    }

    closeImageModal = (e) => {
        // User friendly close
        this._overlay.hide();
        this.revertOffsetStyles(e);

        var ref = this.modal.ref

        // Remove from DOM
        setTimeout(() => {
            this._image.classList.remove('hide')
            ref.parentNode.removeChild(ref);
            this.modal.ref = null
        }, 240)
    }


    revertOffsetStyles(e) {
        const image = this.modal.ref.querySelector('.ThreadImageModal__image')
        image.classList.add('animate-out')
    }
}

ThreadImage.displayName = 'ThreadImage';

export default ThreadImage;
