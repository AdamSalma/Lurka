# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added
### Changed
### Fixed


## v0.12.0
### Added
- Added a sidebar to handle content settings
- Added a home screen where different boards can be navigated to
- Board post image zooms in on mouseover
- Thread tooltips now bounce on entry

### Changed
- Redesigned navbar to show board stats

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
- Fixed thread not closing when clicked on the mask underneath
- Fixed thread quotelinks onclick changing url


## v0.10.0 - 30/01/2017
### Added
- Board posts slide into view when scrolled
- New header layout and content options
- Added a navbar for board toggling
- Added a preload screen while the app fetches initial data
- Added initial settings

### Changed
- Dropped support for reddit
- Color scheme refactor
- No more homescreen. Work input != output

### Fixed
- Lots of things


## v0.9.0 - 24/12/2016
### Added
- Added support for reddit board lists
- New homepage layout
- Added Header scrolling in/out of view when board/thread scrolled

### Changed
- Changed text highlighting color to primary
- Changed UI of replies on board posts

### Fixed
- Fixed thread post controls incorrectly positioned
- Fixed board post text highlighting triggering a fetch


## v0.8.0
### Added
- Header displays the apps status.
- Header now has a seachbox.
- New board design + on hover over posts, OP comment animates
- New Thread design: Added icons to bottom of posts (download, quote, replies)

### Changed
- Flattened Redux state.

### Fixed
- Fixed 4chan blocking media requests by proxying imgs/vids through server.


## v0.7.0 - 14/11/2016
### Added
- Board now has infinite scrolling.
- Add pintrest-like grid structure to Board.
- (4chan) Thread Posts now have backquotes that scroll to post onclick.
- Add support for Redux DevTools addon in chrome.
- Add thread support code syntax (/g/)
- Thread posts now have timeago date formats with a tooltip on mouseover

### Changed
- Complete restructure of redux state
- Disable consecutive requests to provider APIs.
- ThreadPost uses moment instead of TimeAgo component.
- Header refactor. Now smaller and somewhat more pleasing to the eye.

### Fixed
- Fix board list dropdown onclick requesting null board.
- Fix board layout unequal spacing.
- Fix thread scrollbar visible during fetch.
