# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
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
