export default {	
	status: {
		providers: ["4chan", "reddit", "imgur"],

		isMainPage: true,
		isScrolling: false,  // not user scroll
		isLogoSpinning: false,  // log to user animation

		statusMessage: "test",  // log to user text

		provider: "4chan",
		boardID: "g",
		threadID: null,
	},

	boardlist: {  // obj for each provider: {4chan: [], reddit: []}
		favourites: []  // [{id:'4chan', board: 'g'}, ...]
	},  

	board: {
		isFetching: false,
		didInvalidate: false,
		history: {},
		posts: [],
		watch: [],
		limit: 30  // infinite scroll
	},

	thread: {
		isActive: false
		isFetching: false,
		didInvalidate: false,
		history: {},
		posts: [],

	},

	post: {
		isAuthenticated: false,
		references: [],
		reply: false,
		message: null,
		media: null
		// canReply
	}

	settings: {
		// TODO: all settings here in a flat structure
		userStoragePath: "./",
		customStyleSheet: null
		// boardPostMax: 30 // TODO: Add boardpost limit to state
	}
}