# Lurka TODO's

Also contains a few ideas that may or may not happen.

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
  

# Libraries to look at/implement
- nock - testing http in isolation
- moment - format time
- mousetrap - catch keyboard shortcuts
- nslog - use console.app to log to file natively
- q - promises
- sentry - realtime error tracking. use with raven
- lusca - Application security for express. (express-sessoion, cookie-session)
- tab - Unix-style tables for command-line utilities. implement into current logger 




# Old todos
- `APP_INIT` action HomePanel componentWillMount, `APP_READY` on all boardlists loaded + misc
- Homepanel boardlists, providers like this: http://tympanus.net/Development/SelectInspiration/index4.html
- fix media
- remove bad posts on 404 using index splice like first example [here](https://facebook.github.io/react/docs/animation.html)
- store archives frontend using couchdb
- row of thread options: quote, save, info, replies
- reference section: extra box on the side that has posters id. underneath it contains all ids that referred to it. hovering/clicking on any ID scrolls thread to that ID
- board/provider title on top of board. 
- header hidden on contentpage top, but on scroll past ^^ title, scrolls down. like google news iOS app
