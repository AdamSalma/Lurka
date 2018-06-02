import React from 'react';
import ReactDOM from 'react-dom';

import { Icon, ExpandedImage, Zoom } from '~/components/UI';
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
            ref: null,
            transitionInDuration: 480,
            transitionOutDuration: 240
        }

        this.resetZoomState();
        this.resetDragState();

        // Debounce mousemove so the dragged image doesn't stutter
        this.onZoomImgMouseMove = utils.throttle.invokeAtBeginingEndAndByCount({
            delay: 240,
            count: 240,
            callback: this.onZoomImgMouseMove
        });
    }

    resetZoomState = () => {
        this.zoom = {
            isZoomed: false,
            zoomStep: 0.2,
            zoomAmount: 1,
            maxZoomIn: 2,
            maxZoomOut: 0.5,
        }
    }

    resetDragState = (keepPosition=false) => {
        this.drag = this.drag || {};
        this.drag = {
            ...this.drag,
            startPageX: null,
            startPageY: null,
            isDragging: false,
            callCount: 0,
            hasMovedYet: false,
        }

        if (!keepPosition) {
            this.drag.translateX = 0
            this.drag.translateY = 0
            this.drag.originX = 0
            this.drag.originY = 0
        }
    }

    setImageRef = ref => this._originalImage = ref;
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
        e.stopPropagation();

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
            this._overlay.show();
            this._originalImage.classList.add('hide');
            setTimeout(this.onModalAnimationInComplete, this.modal.transitionInDuration);
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
          onMouseUp={this.closeImageModal}
          onWheel={this.handleZoomImgScroll}>
            <div>
                <Overlay ref={this.setOverlayRef}>
                    Scroll to zoom
                </Overlay>
                <ExpandedImage
                  className="ThreadImageModal__image"
                  srcThumbnail={thumbnail}
                  srcExpanded={src}
                  style={style}
                />
            </div>
            <ExpandedImage
              className="ThreadImageModal__image ThreadImageModal__zoom hide"
              srcThumbnail={thumbnail}
              srcExpanded={src}
              onMouseDown={this.handleZoomImgMouseDown}
              style={{
                // `style` also contains scale, which we dont want
                width: style.width,
                height: style.height
              }}
            />
            {/*<Zoom maxZoomScale={3} minZoomScale={0}>
            </Zoom>*/}
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
        if (this.drag.isDragging) {
            // We dont want to close if the user just dragged the image.
            return
        }

        console.log("Closing modal", this.caller);
        // User friendly close
        this._overlay.hide();
        this.zoomImage.classList.add('hide');
        this.modalImage.classList.remove('hide');
        this.revertOffsetStyles(e);

        var ref = this.modal.ref;

        // Remove from DOM
        setTimeout(() => {
            this._originalImage.classList.remove('hide');
            ref.parentNode.removeChild(ref);

            this.resetZoomState();
            this.resetDragState();
            this.resetRefs();
        }, this.modal.transitionOutDuration);
    }

    onModalAnimationInComplete = () => {
        // Setup zooming
        this.zoomImage.classList.remove('hide')
        this.modalImage.classList.add('hide')
    }

    handleZoomImgScroll = (event) => {
        console.log("handleZoomImgScroll")
        // TODO: instead of zooming to the center, zoom based where the mouse is
        const delta = event.deltaY;
        const mouseX = event.pageX;
        const mouseY = event.pageY;

        console.groupCollapsed("Zoom")
        console.log("MouseY:", mouseY);
        console.log("MouseX:", mouseX);
        console.log("Delta:", delta);
        console.log("Scroll event:", event);
        console.groupEnd();

        const zoomStep = event.deltaY < 0 ? this.zoom.zoomStep : -this.zoom.zoomStep;
        const nextZoom = this.zoom.zoomAmount + zoomStep

        const tooBig = nextZoom > this.zoom.maxZoomIn
        const tooSmall = this.zoom.maxZoomOut > nextZoom

        // Check zoom in/out limits
        if (tooBig || tooSmall) {
            console.warn("Zoom limit reached. Not zooming further", nextZoom);
            return;
        }
        // Increase / decrease zoom amount depending on scroll direction
        this.zoom.zoomAmount = nextZoom

        this.zoomImage.style.transform =
            `scale(${nextZoom}) translate(${this.drag.translateX}px, ${this.drag.translateY}px)`
    }

    handleZoomImgMouseDown = (e) => {
        this.drag.startPageX = e.pageX
        this.drag.startPageY = e.pageY

        document.addEventListener("mousemove", this.onZoomImgMouseMove);
        document.addEventListener('mouseup', this.onZoomImgMouseUp);

        e.preventDefault();
        // So that the modal doesn't close (theres a parent click handler);
        e.stopPropagation();
    }

    // Drags the image
    onZoomImgMouseMove = (e) => {
        if (!window.getComputedStyle) return;

        // Calc change since start
        var offsetX = -(this.drag.startPageX - e.pageX);
        var offsetY = -(this.drag.startPageY - e.pageY);

        // console.log("Transform:", transformMatrix);
        // console.log("Mouse: X", e.pageX, "Y", e.pageY);
        // console.log("Diff: X", offsetX, "Y", offsetY);

        // console.log("ORIGINX:", this.drag.originX)
        var translateX = (offsetX + this.drag.originX) / this.zoom.zoomAmount;
        var translateY = (offsetY + this.drag.originY) / this.zoom.zoomAmount;

        // if (!this.drag.hasMovedYet) {
        //     this.drag.hasMovedYet = true;

        //     // Perform initial positioning:
        //     // User may have already dragged the image; so we need to start
        //     // from the current translation.
        //     var matrix = window.getComputedStyle(this.zoomImage)
        //                        .transform
        //                        .replace(/[^0-9\-.,]/g, '')
        //                        .split(',');

        //     translateX = offsetX + parseInt(matrix[12] || matrix[4]);  // translateX
        //     translateY = offsetY + parseInt(matrix[13] || matrix[5]);  // translateY

        // } else {
        // }

        var transform = `scale(${this.zoom.zoomAmount}) translate(${translateX}px, ${translateY}px)`;

        // Apply the transform (jQuery handles it better than style.transform)
        $(this.zoomImage).css({transform});

        this.drag.translateX = translateX;
        this.drag.translateY = translateY;
        this.drag.isDragging = true;
    }

    onZoomImgMouseUp = (e) => {
        document.removeEventListener('mousemove', this.onZoomImgMouseMove);
        document.removeEventListener('mouseup', this.onZoomImgMouseUp);

        e.preventDefault();
        this.resetDragState(true); // true = ignore resetting position
        this.drag.originX = this.drag.translateX;
        this.drag.originY = this.drag.translateY;
    }

    get zoomImage () {
        if (!this._zoomImage) {
            this._zoomImage = this.modal.ref.querySelector('.ThreadImageModal__zoom');
        }
        return this._zoomImage
    }

    get modalImage () {
        if (!this._modalImage) {
            this._modalImage = this.modal.ref.querySelector('.ThreadImageModal__image')
        }
        return this._modalImage;
    }

    resetRefs() {
        delete this._modalImage;
        delete this._zoomImage;
        delete this.modal.ref;
    }

    onModalImageMouseUp = (e) => {
        if (this.zoom.isZoomed) {
            // Ignore mouseUp's because the user is dragging the image. We dont
            // want the click event to propagate otherwise it will close the image
            e.stopPropagation();
        }
        // Otherwise allow the click to bubble; the click will close the image
    }

    revertOffsetStyles(e) {
        this.modalImage.classList.add('animate-out')
    }
}

ThreadImage.displayName = 'ThreadImage';

export default ThreadImage;
