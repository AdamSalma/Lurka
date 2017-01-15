import React, {Component} from 'react'
import classNames from 'classnames'
import uuid from 'uuid'

import Icon from '../Icon'
import BoardList from '../BoardList'
import SearchBox from '../SearchBox'

export default class Navbar extends Component {
    constructor({ status, fetchBoardList, boardList }) {
        super()

        this.state = {
            providersToDisplay: status.providers,
            favouritesOnly: false,
            searchPhrase: ''
        }

        this.prepareForFetch = this.prepareForFetch.bind(this);
        this.toggleFavourite = this.toggleFavourite.bind(this);
        this.renderBoardlist = this.renderBoardlist.bind(this);
        this.toggleProvider  = this.toggleProvider.bind(this);
        this.handleSearch    = this.handleSearch.bind(this);
        this.toggleFavouriteButton = this.toggleFavouriteButton.bind(this);

        status.providers.map(provider => {
            if (!boardList[provider] || !boardList[provider].length)
                fetchBoardList(provider)
        })
    }

    componentDidUpdate(prevProps, prevState) {
        /* See updatePreloadText at end*/
        if (preloading)
            updatePreloadText(this.props)
    }

    render() {
        const {providersToDisplay, favouritesOnly} = this.state
        const {status: {providers}} = this.props

        console.warn(providersToDisplay);

        return (
            <div id="navbar" className="navbar">
                <div className="navbar-controls">
                    <SearchBox 
                        onKeyUp={this.handleSearch} 
                        placeholder={`Search...`}
                    />
                    <div className="navbar-filter-buttons">
                        {providers.map( provider => {
                            // Create buttons to filter provider boards
                            const classes = classNames('list-toggle', `p-${provider}`, {
                                "disabled":  favouritesOnly || !providersToDisplay.includes(provider)
                            })

                            return <span className={classes} key={provider} onClick={this.toggleProvider.bind(null, provider)}>
                                {provider}
                            </span>
                        })}
                        {/*Additional button to filter favourites*/}
                        <span onClick={this.toggleFavouriteButton} className={classNames('list-toggle favourite', {'disabled': !favouritesOnly})}>
                            Favourites
                        </span>
                    </div>
                </div>
                <div className="navbar-content">
                    {providersToDisplay && this.renderBoardlist()}
                </div>
            </div>
        )
    }

    renderBoardlist() {
        const boardlist = this.getBoardlists()
        const elements = boardlist.map( ({provider, boardID, short_desc}) => {
            // Create each element
            const isFavourite = this.isFavourite(boardID)
            const star = classNames('mdi', 'clearfix', {
                'mdi-star': isFavourite,
                'mdi-star-outline': !isFavourite
            })

            return (
                <div key={uuid.v4()} onClick={
                    this.prepareForFetch.bind(null, provider, boardID)
                }>
                    <Icon className={star} 
                        onClick={ e => this.toggleFavourite(e, provider, boardID)}
                    />
                    {short_desc}
                </div>
            )
        })

        return <BoardList 
            shouldPreload={false}
            boardListElements={elements}
            boardList={boardlist}
            provider="all"
        />
    }

    prepareForFetch(provider, boardID) {
        const {scrollPage, scrollHeader, changeProvider, fetchBoard, toggleNavbar} = this.props;

        changeProvider(provider)
        fetchBoard({boardID, provider})
        toggleNavbar({open: false})
        scrollHeader(true, 600)
        scrollPage({
            page: "board", 
            direction: "up"
        })
    }

    getBoardlists() {
        const { fetchBoardList, boardList, status:{ providers }} = this.props;
        const { searchPhrase, favouritesOnly, providersToDisplay } = this.state
        const loadingBoardlists = providers.filter( provider => {
            return !(boardList[provider] && boardList[provider].length)
        })

        if (loadingBoardlists.length) 
            return []

        // combine boardlists + add provider to each item
        let boardlist = providersToDisplay.map(provider => {
                return boardList[provider].map( item => {
                    item.provider = provider
                    return item
                }
            )
        })

        if (boardlist.length) {
            // flatten boardlists unless falsey
            boardlist = boardlist.reduce((a,b) => b ? a.concat(b) : a) 
        }

        if (favouritesOnly) {
            // filter 
            // TODO: make add fave -> change bordlist items, not add to fave list. remote favelist.
        } 

        if (searchPhrase) {
            boardlist = boardlist.filter( board => 
                board.description
                     .toLowerCase()
                     .includes(searchPhrase)
            )
        }

        return boardlist.sort()
    }

    toggleFavourite(event, provider, boardID) {
        // check if board is in favourites
        event.stopPropagation()
        if (this.isFavourite(provider, boardID)) {
            console.log(`removeFromFavourites() ${provider} ${boardID}`)
            this.props.removeFromFavourites(provider, boardID)
        } else {
            console.log(`addToFavourites() ${provider} ${boardID}`)
            this.props.addToFavourites(provider, boardID)
        }
    }

    isFavourite(boardID) {
        // Checks if board is in favourites. Return bool
        return !!this.props.boardList['favourites']
                     .find( ({ boardID: id }) => id === boardID )
    }

    handleSearch(event) {
        const searchPhrase = event.target.value.toLowerCase()
        this.setState({searchPhrase})
    }

    toggleProvider(provider) {
        console.log("toggleProvider(): " + provider);
        this.setState( (state) => {
            let ps = state.providersToDisplay
            if (ps.includes(provider)) {
                // Remove from list
                ps = ps.filter(p => p !== provider)
            } else {
                // Add to list
                ps.push(provider)
            }

            return Object.assign({}, state, {providersToDisplay: ps})
        })
    }

    toggleFavouriteButton() {
        this.setState(state => {
            return Object.assign({}, state, {favouritesOnly: !state.favouritesOnly})
        })
    }
}

/* Preload stuff */
var preloading = true
const preloadScreenEl = $('#preload-screen')
const preloadTextEl = preloadScreenEl.find('#preload-status-text')

function updatePreloadText({ boardList, status:{providers} }) {
    const remainingBLs = providers.filter( provider => {
        return !(boardList[provider] && boardList[provider].length)
    })

    let text
    if (remainingBLs.length > 0) {
        text = "Fetching boards"
    } else {
        preloading = false
        text = "Ready"
        preloadScreenEl.addClass('loaded')   
    }

    preloadTextEl.text(text)
}

function revealApp(){


}
