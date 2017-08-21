const WatchEntity = props => {
    const {
        updateInterval, onUpdate, onUnwatch, onClick,
        metadata: {
            didInvalidate,
            isFetching,
            lastReplyAt,
            newPosts=0,
            postsCount,
            op
        }
    } = props;

    const postClasses = cx("new-posts", {
        "has-new": newPosts > 0  // TODO: && state.watchedOpenedFor5Secs || hovered
    })

    const postText = newPosts > 0 ? newPosts : "No new posts"

    return (
        <div className="watch-item tilter" onClick={onClick}>
            <div className="watch-content">

            {/* Content */}
                <div className="thumbnail">
                    <img src={op.media.thumbnail} />
                </div>
                <div className="watch-post">
                    <span
                        className="text"
                        dangerouslySetInnerHTML={{
                            __html: op.title ? op.title : op.comment
                        }}
                    />

                    {/* Watch Stats */}
                    { isFetching ?
                        <div className="watch-stats"><div className="updating">Updating</div></div>
                        : (<div className="watch-stats">
                            <div className={postClasses}>
                                {postText}
                            </div>
                            <div className="total-posts">
                                Total: {postsCount}
                            </div>
                            <div className="timeago">
                                <TimeAgo time={lastReplyAt} canToggle={false}/>
                            </div>
                        </div>)
                    }
                </div>


            </div>
            <div className="watch-controls">
                <div className="watch-close" onClick={onUnwatch}>
                    <Icon name={i.watchPanelClose}/>
                </div>
                <div className="watch-update" onClick={onUpdate}>
                    <Icon name={i.watchPanelUpdate}/>
                </div>
            </div>

            <Timer
                displayCounter={false}
                seconds={updateInterval}
                autoreset={true}
                active={!didInvalidate}
                onTimerEnd={onUpdate}
            />
        </div>
    )
}
