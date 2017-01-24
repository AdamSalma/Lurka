# Lurka

> *A desktop app for viewing messaging boards such as 4chan and reddit in a unified format.*

**This project is under development on a daily basis - Get in touch!**.

See the TODO's below for upcoming plans.

## Installation
To use Lurka, you will need to install [Node](https://nodejs.org/en/) and [Git](https://git-scm.com/) if you haven't got them.
```bash
# Clone the repository
git clone https://github.com/AdamSalma/Lurka.git

# Enter repo and install dependencies
cd Lurka && npm run install-all
```
## Development mode 
This will run through `localhost:3000` in your browser:
```bash
npm run dev
```

## Production mode
This runs as a desktop application using Electron:
```bash
npm run build && npm start
```

## TODOs
### Content:
- [x] 4chan
    - [x] boards
    - [x] threads
    - [ ] archives
- [x] Reddit
  - [x] board searching
  - [x] subreddits (boards)
  - [ ] posts (threads)
  - [ ] archives
- [ ] Embedded content (Youtube/Imgur etc...)
  
### UI:
- [x] Dark interface
- [x] Masonry type grid layout (like pintrest / windows 10 start menu)
- [x] Grid items animate on entering viewport
- [x] User notifications
- [x] Thread loads on top of faded board with a scrollup animation
- [x] Use Material design icons
- [ ] Area for replying + creating thread
- [x] Posts display "time ago" since creation
- [ ] Awesome logo
- [ ] Images can be fullscreened
- [ ] Homepage

### Functionality:
- [ ] Be able to create a thread or post
- [x] Content options - Search, filter, watch (in board or thread)
- [ ] Continuous content updating (every 10 secs? use if-modified-since)
- [x] Internal Archives.
- [ ] Save a Thread/Post/Image to a desired folder.
- [x] Access archives from content providers.
- [x] Settings.
- [ ] User stylesheets - (figure out how to do this...)
- [ ] Keyboard shortcuts - next post, save image of current post, 
- [ ] Scroll between posts in thread using clicks
- [ ] Watch multiple threads for new posts
- [x] Thread controls

### Backend
- [x] Proxy all requests to 3rd party content through server.
- [x] Routes
- [x] Services
- [x] Parsers
  - [x] Reddit parser
  - [x] 4chan parser

### Dev:
- [x] Hot module replacement
- [x] Redux devtools (Browser addon)
- [ ] Dev envioronment with electron?
- [x] Separate dev/app dependencies
- [x] Webpack dev bundle through express
- [x] Build app directory with Gulp and then bundle project with webpack.
- [ ] Electron exe. Maybe even an installer...
- [x] Custom logging library for backend

### Tests 
Less of a priority until things are where they should be!
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
- [x] Constants
  
