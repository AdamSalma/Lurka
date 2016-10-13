export default {
	status: {
		provider: "4chan",
		providers: ["4chan"],
    	boardID: "g"
	},
	header: {
		isMainPage: true,
		isAnimating: false,
		loadingText: "test"
	},
	thread: {
	    posts: [],
	    postsLoaded: 0,
	    isFetching: false
	},
	board: {
		isFetching: false,
	    didInvalidate: false,
	    boardList: [],
	    items: []
	}
}