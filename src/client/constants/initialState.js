export default {
	status: {
		currentPage: "home", // currentPage
		isScrolling: false,  // app scroll
		isHeaderVisible: true,  // if currentPage == "content"
		isNavbarOpen: false,
		activeHeaderPanel: null,  // responses to header buttons
		alertMessage: null,  // reveal status to user
		provider: "4chan",
		boardID: null,
		threadID: null,
	},

	boardList: {
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
		limit: 30  // infinite scroll
	},

	boardHistory: { },

	thread: {
		receivedAt: 0,  // unix timestamp
		isActive: false,
		isFetching: false,
		didInvalidate: false,
		posts: [],
	},

	threadHistory: { },

	threadMonitor: {
		newPosts: 0,
		threads: [
			// e.g. {threadID, boardID, posts}
		]
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

