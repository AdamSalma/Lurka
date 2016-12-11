export default {	
	status: {
		isScrolling: false,  // app scroll
		currentPage: "home", // currentPage
		isHeaderVisible: false,  // if currentPage == "content"


		statusMessage: null,  // reveal status to user

		providers: ["4chan", "reddit"],
		provider: "4chan",
		boardID: "g",
		threadID: null,
	},

	boardList: {  // obj for each provider: {4chan: [], reddit: []}
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
		content: null,  // user input
		upload: null
		// canReply
	},

	settings: {
		// TODO: all settings here in a flat structure
		userStoragePath: "./",
		customStyleSheet: null,
		filterKeywords: []  // filter board 
		// boardPostMax: 30 // TODO: Add boardpost limit to state
	}
}
