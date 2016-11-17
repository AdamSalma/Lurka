# Lurka

> *A desktop app for viewing messaging boards such as 4chan and reddit in a unified format.*

**This is an ongoing project**. If you know a thing or two about designing get in touch!

See the TODO's below for upcoming plans.

## Installation
If you dont have [Node](https://nodejs.org/en/) or [Git](https://git-scm.com/), now would be a good time to get them. 
```bash
git clone https://github.com/AdamSalma/Lurka.git

# Install dependencies
cd Lurka && npm run install-all
```
## Development mode 
This will run through `localhost:3000` in your browser:
```bash
npm run dev
```
***Note:*** Webpack will bundle the src into memory (HMR) so make sure your computer can handle it

## Production mode
This runs as a desktop application using Electron:
```bash
npm run build && npm start
```
***Note:*** Building can take a while. For consecutive runs just use `npm start`

## TODOs
### Content:
- [x] 4chan
- [ ] Reddit
- [ ] Imgur
- [ ] Youtube (Embedded only)
  
### UI:
- [x] Dark interface
- [x] Masonry type grid layout (think pintrest)
- [ ] Grid items animate on entering viewport
- [ ] Display status via header
- [x] Thread loads on top of faded board with a scrollup animation
- [x] Use Material design icons
- [ ] Area for replying + creating thread
- [x] Posts display "time ago" since creation
- [x] Relatively awesome logo
- [ ] Images can be fullscreened

### Functionality:
- [ ] Be able to submit the creation of a thread or post
- [ ] Content options - Search, filter, watch (in board or thread)
- [ ] Continuous content updating (every 10 secs? use if-modified-since)
- [ ] Easy saving of Thread/Post/Image locally. Archives?
- [ ] Access archives from content providers
- [ ] Settings
- [ ] User stylesheets - (figure out how to do this...)
- [ ] Keyboard shortcuts - next post, save image of current post, 
- [x] Scroll between posts in thread using clicks
- [ ] Tabs? Or would that defeat using a desktop app?
- [ ] Thread controls

### Backend
- [x] Proxy all requests to 3rd party content through server.

### Dev:
- [x] Hot module replacement
- [x] Redux devtools (Browser addon)
- [ ] Dev envioronment with electron?
- [x] Separate dev/app dependencies
- [x] Webpack dev bundle through express
- [x] Bundle production code front/backend through webpack via gulp 
- [ ] Build bundle into an Electron exe. Maybe even an installer
- [x] Create logging library for backend

### Tests 
Less of a priority until things actually work!
#### Fronend
- [ ] Components
  - [ ] Major - Board/Thread
  - [ ] Sub - board/thread posts
  - [ ] Containers
- [ ] Actions
  - [x] Async requests
  - [ ] Sync
- [ ] Reducers
  - [ ] Content
  - [ ] Settings
  - [ ] Status  
  
#### Backend
- [ ] Routes
- [ ] Services
