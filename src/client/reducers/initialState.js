export default {	
	status: {
		providers: ["4chan", "reddit", "imgur"],

		isMainPage: true,
		isAnimating: false,  // for header toggle
		isScrolling: false,  // not user scroll
		isLogoSpinning: false,  // log to user animation

		loadingMessage: "test",  // log to user text
		mode: "normal"  // "archive"

	},
	content: {
		provider: "4chan",
    	boardID: "g",
    	threadID: null,

		isFetching: false,
		didInvalidate: false,
		requestType: null,  // for logging to user if error

		boardlist: {  // obj for each provider: {4chan: [], reddit: []}
			favourites: []  // [{id:'4chan', board: 'g'}, ...]
		},  
		board: {
			history: {},
			posts: [],
			watch: [],
			limit: 30  // infinite scroll
		},
		thread: {
			history: {},
			posts: [],
			reply: false
			// canReply
		}
	},
	settings: {
		isFetching: false,
		didInvalidate: false
		// TODO: all settings here in a flat structure
		// customStyleSheet: null
	}
}