export default {	
	status: {
		isMainPage: true,
		isAnimating: false,

		loadingText: "test",
		mode: "normal"  // archive

	},
	content: {
		providers: ["4chan", "reddit", "imgur"],
		provider: "4chan",
    	boardID: "g"
    	threadID: null

		isFetching: false,
		didInvalidate: false,
		requestType: null,

		boardlist: {  // obj for each provider: 4chan: {}, reddit: {}
			favourites: {}
		},  
		board: {
			history: {},
			posts: [],
			watch: []
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
		// TODO - all settings here in a flat structure
		// customStyleSheet: null
	}
}