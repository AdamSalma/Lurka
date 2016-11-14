# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
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
