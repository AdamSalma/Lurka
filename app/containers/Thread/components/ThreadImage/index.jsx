import React from 'react';
import ReactDOM from 'react-dom';

import { Icon, ExpandedImage, Zoom } from '~/components';
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
            transitionDuration: 250,
            isZoomed: false,
            zoomStep: 0.2,
            zoom: 1
        }

        this.handleZoomImgScroll =
            utils.throttle.invokeThenIgnoreForPeriod(50, this.handleZoomImgScroll)
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
            this._overlay.show();
            this._image.classList.add('hide');
            setTimeout(this.onModalAnimationComplete, this.modal.transitionDuration);
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
          onClick={this.closeImageModal}>
            <div>
                <Overlay ref={this.setOverlayRef}>
                    Scroll to zoom
                </Overlay>
                <ExpandedImage
                  className="ThreadImageModal__image"
                  srcThumbnail={thumbnail}
                  srcExpanded={src}
                  style={style}
                  onMouseUp={this.onModalImageMouseUp}
                />
            </div>
            <ExpandedImage
              className="ThreadImageModal__image ThreadImageModal__zoom hide"
              srcThumbnail={thumbnail}
              srcExpanded={src}
              onScroll={this.handleZoomImgScroll}
              onMouseDown={this.handleZoomImgMouseUp}
              onMouseUp={this.handleZoomImgMouseDown}
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
        // User friendly close
        this._overlay.hide();
        this.modalImageRef.classList.remove('hide')
        this.zoomImageRef.classList.add('hide')
        this.revertOffsetStyles(e);

        var ref = this.modal.ref

        // Remove from DOM
        setTimeout(() => {
            this._image.classList.remove('hide')
            ref.parentNode.removeChild(ref);
            this.modal.ref = null
        }, 240)
    }

    onModalAnimationComplete = () => {
        // Setup zooming
        $(this.modal.ref).on('mousewheel', this.handleZoomImgScroll)
        this.zoomImageRef.classList.remove('hide')
        this.modalImageRef.classList.add('hide')
    }

    handleZoomImgScroll = (event) => {
        const delta = event.originalEvent.wheelDelta;
        const mouseX = event.pageX;
        const mouseY = event.pageY;

        const zoomStep = delta > 0 ? this.modal.zoomStep : -this.modal.zoomStep;

        this.modal.zoom += zoomStep

        this.zoomImageRef.style.transform = `scale(${this.modal.zoom})`

    }

    handleZoomImgMouseDown(e) {
        this._zoomMouseDownEvent = e
    }
    handleZommImgMouseMove(e) {
        if (this._zoomMouseDownEvent) {
            this._dragging = true
            this.dragZoomImg(e)
        }
    }
    handleZoomImgMouseUp(e) {
        if (this._dragging) {
            this._dragging = false
            delete this._zoomMouseDownEvent
            e.stopPropagation();
        } else {
            this.closeImageModal();
        }
    }
    dragZoomImg(e) {
        this.modal.ref.querySelector('')
    }

    get zoomImageRef () {
        return this.modal.ref.querySelector('.ThreadImageModal__zoom')
    }

    get modalImageRef () {
        return this.modal.ref.querySelector('.ThreadImageModal__image')
    }

    onModalImageMouseUp = (e) => {
        if (this.modal.isZoomed) {
            // Ignore mouseUp's because the user is dragging the image. We dont
            // want the click event to propagate otherwise it will close the image
            e.stopPropagation();
        }
        // Otherwise allow the click to bubble; the click will close the image
    }

    revertOffsetStyles(e) {
        this.modalImageRef.classList.add('animate-out')
    }
}

ThreadImage.displayName = 'ThreadImage';

export default ThreadImage;
