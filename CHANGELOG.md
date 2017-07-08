# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## v0.15.0 09/08/2017
### Added
- Electron development environment - fullscreen window instead of using localhost via browser.
- Set custom headers to bypass 4chan image block. (via electron)

### Changed
- Board post images now render with a placeholder to increase performance when rendering a new board.


## v0.14.0 08/08/2017
### Added
- Opened thread images now load over a stretched, blurred thumbnail for a better visual effect
- Dashboard supports board drag-n-drop
- Server caches media proxy requests for speed
- Thread header now displays metadata about the current thread
- Main navbar icons have a new sliding animation
- Added settings to main content page as a sidebar/drawer

### Changed
- Replace icon pack with custom version

### Fixed
- Thread control icons now aligned properly


## v.0.13.0 25/06/2017
### Added
- Boards/Threads are cached in state to increase performance when reopening.
- Header:
    - Split up the header to contain a main and sub toolbar.
    - Sub toolbar animates in and out of view when scrolling in a board/thread.
- Thread:
    - Threads now have a title post at the top.
    - Tooltips generate a '(This)' field when there are more than one quote in a tooltip.
    - OP quotes now have a '(OP)' field
    - Hovering over filename shows full title.

### Changed
- Use hardware acceleration and CSS3's translate to prevent stutter when animating throughout the app.
- Scrolling between thread posts uses velocity instead of jQuery.animate for increased performance.
- Remove Drawer

### Fixed
- Fixed board post links opening when clicked.


## v0.12.0  13/05/2017
### Added
- Added a sidebar to handle content settings.
- Added a home screen where different boards can be navigated to.
- Board post image zooms in on mouseover.
- Thread quote tooltips now bounce into view when activated.

### Changed
- Redesigned navbar to show board stats.

### Fixed
- Fonts not loading through electron; localhost != 127.0.0.1


## v0.11.0 01/04/2017
### Added
- Added header panels that popup when a header icon is clicked. Panels added:
    - Thread monitoring
    - Local archives
    - Board filter
    - Board sort

### Changed
- Restructured project. See [HERE](https://github.com/AdamSalma/Lurka/pull/7)

### Fixed
- Fixed thread not closing when clicked on the mask underneath.
- Fixed thread quotelinks onclick changing url.


## v0.10.0 - 30/01/2017
### Added
- Board posts slide into view when scrolled.
- New header layout and content options.
- Added a navbar for board toggling.
- Added a preload screen while the app fetches initial data.
- Added initial settings.

### Changed
- Dropped support for reddit.
- Color scheme refactor.
- No more homescreen. Work input != output.

### Fixed
- Lots of things.


## v0.9.0 - 24/12/2016
### Added
- Added support for reddit board lists.
- New homepage layout.
- Added Header scrolling in/out of view when board/thread scrolled.
- Added Board/Thread caching.

### Changed
- Changed text highlighting color to primary.
- Changed UI of replies on board posts.

### Fixed
- Fixed thread post controls incorrectly positioned.
- Fixed board post text highlighting triggering a fetch.


## v0.8.0
### Added
- Header displays the apps status.
- Header now has a seachbox.
- New board design + on hover over posts, OP comment animates.
- New Thread design: Added icons to bottom of posts (download, quote, replies)

### Changed
- Flattened Redux state.

### Fixed
- Fixed 4chan blocking media requests by proxying imgs/vids through server.
- Fix server stream errors with HMR.


## v0.7.0 - 14/11/2016
### Added
- Board now has infinite scrolling.
- Add pintrest-like grid structure to Board.
- (4chan) Thread Posts now have backquotes that scroll to post onclick.
- Add support for Redux DevTools addon in chrome.
- Add thread support code syntax (/g/)
- Thread posts now have timeago date formats with a tooltip on mouseover.

### Changed
- Complete restructure of redux state.
- Disable consecutive requests to provider APIs.
- ThreadPost uses moment instead of TimeAgo component.
- Header refactor. Now smaller and somewhat more pleasing to the eye.

### Fixed
- Fix board list dropdown onclick requesting null board.
- Fix board layout unequal spacing.
- Fix thread scrollbar visible during fetch.
