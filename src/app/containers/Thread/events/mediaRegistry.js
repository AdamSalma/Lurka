import utils from '~/utils';
import setupEvents from './setup';

const { headerHeight, threadWidth } = window.appSettings;

export default class mediaRegistry {
    constructor(context, config) {
        this.expandedMedia = {}
        this.thread = context
        this.config = config;
        this.events = setupEvents(context)
    }

    getPostById( id ) {
        return this.thread.querySelector('#p' + id)
    }

    isExpanded = ( id ) => this.expandedMedia[id] || false

    addWebmScrollListener( post, callback ) {
        const video = post.querySelector('video');
        console.log("Video is", video);

        const onScroll = utils.throttle.throttleByCount(7,
            () => {
                console.log("webmScrollHandler", video.getBoundingClientRect())
                if (!utils.dom.isElementPartiallyInViewport(video)) {
                    console.log("Pausing webm")
                    video.pause();
                    this.thread.removeEventListener("scroll", onScroll, {passive: true});
                }
            }
        )

        this.thread.addEventListener("scroll", onScroll, {passive: true})
        console.log("Added webm scroll event listener");
    }

    /**
     * Scroll media into view if necessary and setup Webm pausing when user
     * scrolls webm out of viewport for increased performance
     */
    onMediaToggle = ({ media, id }) => {
        console.log(arguments)
        console.groupCollapsed('%cMediaToggled', 'color: skyblue; background: #212121');
        let shouldScroll = true;
        const isExpanded = this.isExpanded(id);
        const postEl = this.getPostById(id);
        // Initialise options with default values (assumes closing):
        const scrollOpts = {
            highlightPost: this.config.highlightPost,
            offset: this.config.postOffset,
            scrollDuration: this.config.closeDuration,
        }

        console.log(`Media is ${isExpanded ? 'closing' : 'opening'}. (id: ${id})`);
        console.log("Post element:", postEl);

        if (isExpanded) {
            const { top } = postEl.getBoundingClientRect();

            console.log("Media top", top);
            console.log("Is media below header?", top > 14);

            if (top > this.config.headerOffset) {
                // dont scroll down if the user has scrolled back up
                console.log("Media below header: not scrolling");
                shouldScroll = false
            }

        } else {
            // Prepare to oepn media
            const threadHeight = window.innerHeight - headerHeight
            let renderHeight = media.width > threadWidth
                ? media.height * (threadWidth / media.width)
                : media.height;

            console.log("Render height:", renderHeight);
            console.log("Original height:", media.height);
            console.log("Thread height:", threadHeight);

            let isLargeImage = renderHeight > threadHeight;

            scrollOpts.ease = this.config.openEase
            scrollOpts.scrollDuration = this.config.openDuration
            scrollOpts.offset = isLargeImage
                ? this.config.imageOffset
                : this.config.postOffset;

            if (media.filetype === ".webm") {
                console.info("Setting up webm scroll event");
                this.addWebmScrollListener(postEl);
            }
        }

        if (shouldScroll) {
            console.log("Scrolling to post using opts:", scrollOpts);
            this.events.scrollToPost($(postEl), scrollOpts);
        }

        else {
            console.log("Media scroll rejected");
        }

        // Toggle media state
        this.expandedMedia[id] = !isExpanded;

        console.groupEnd();
    }
}
