export default {	
	status: {
		isScrolling: false,  // app scroll
		currentPage: "home", // currentPage
		isHeaderVisible: false,  // if currentPage == "content"
		alertMessage: null,  // reveal status to user
		providers: ["4chan", "reddit"],
		provider: "4chan",
		boardID: null,
		threadID: null,
	},

	boardList: {  // obj for each provider: {4chan: [], reddit: []}
		didInvalidate: false,
		favourites: []  // [{id:'4chan', board: 'g'}, ...]
	},  

	board: {
		receivedAt: 0,  // unix timestamp
		isFetching: false,
		didInvalidate: false,
		searchWord: null,
		filterWords: [],
		history: {},
		posts: [],
		watch: [],
		limit: 30  // infinite scroll
	},

	thread: {
		receivedAt: 0,  // unix timestamp
		isActive: false,
		isFetching: false,
		didInvalidate: false,
		history: {},
		posts: [],
	},

	post: {
		isAuthenticated: false,
		type: null,  // thread/comment
		references: [],
		message: null,  // user input
		upload: null
		// canReply
	},

	settings: {
		// TODO: all settings here in a flat structure
		userStoragePath: "./",
		customStyleSheet: null,
		boardFilterWords: [],
		boardUpdateInterval: 30,
		threadUpdateInterval: 15,
		// boardPostMax: 30 // TODO: Add boardpost limit to state
	}
}
