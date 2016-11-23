APP_INIT action HomePanel componentWillMount

add this.displayName to components...? research

fix media

remove bad posts on 404 using index splice like first example [here](https://facebook.github.io/react/docs/animation.html)

store archives frontend using couchdb

- row of thread options: quote, save, info, replies

- reference section: extra box on the side that has posters id. underneath it contains all ids that referred to it. hovering/clicking on any ID scrolls thread to that ID

## Libraries to look at/implement
- nock - testing http in isolation
- moment - format time
- mousetrap - catch keyboard shortcuts
- nslog - use console.app to log to file natively
- q - promises
- sentry - realtime error tracking. use with raven
- lusca - Application security for express. (express-sessoion, cookie-session)