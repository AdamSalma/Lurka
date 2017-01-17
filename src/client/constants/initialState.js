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
		isNavbarOpen: false
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
		posts: [],
		watch: [],
		limit: 30  // infinite scroll
	},

	boardHistory: {
		"4chan": {}, 
		"reddit": {}
	},

	thread: {
		receivedAt: 0,  // unix timestamp
		isActive: false,
		isFetching: false,
		didInvalidate: false,
		posts: [],
	},

	threadHistory: {
		"4chan": {}, 
		"reddit": {}
	},

	post: {
		isAuthenticated: false,
		type: null,  // thread/comment
		references: [],
		message: null,  // user input
		upload: null
		// canReply
	},

	settings: require('./settings')

}
