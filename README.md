# Lurka

> A unified desktop app for viewing online messaging boards such as 4chan, reddit, and imgur.

## Set-up:
#### Installation
```bash
git clone https://github.com/AdamSalma/Lurka.git

# Install dependencies
cd Lurka && npm run install-all
```
#### Development mode (browser - localhost:3000):
```bash
npm run dev
```
#### Production mode (desktop app - Electron):
```bash
npm run build && npm start
```


####TODOs
#####Content:
- [x] 4chan
- [ ] Reddit
- [ ] Imgur
  
#####UI:
- [x] Dark interface
- [x] Grid layout
- [ ] Grid items animate on entering viewport
- [ ] Reveal status to user via header
- [x] Thread loads on top of faded board
- [x] Thread scrollup animation on load
- [x] Use Material design icons

#####Functionality:
- [ ] Content options - Search, filter, watch (in board or thread)
- [ ] Continuous content updates - prune threads with an animation
- [ ] Archives - save content locally by post, thread or board
- [ ] Settings
- [ ] User stylesheets - (figure out how to do this...)

#####Dev
- [x] SPA
- [x] React + Redux
- [x] Run with Electron
- [x] Separate dev/app dependencies
- [x] Webpack dev bundle through express
- [x] Bundle production code front/backend through webpack via gulp 
- [ ] Build bundle into an Electron exe. Maybe even an installer
- [ ] Test, test, test!
