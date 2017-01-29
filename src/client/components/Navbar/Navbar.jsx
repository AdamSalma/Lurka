import React, {Component} from 'react'
import classNames from 'classnames'
import uuid from 'uuid'

import Icon from '../Icon'
import BoardList from '../BoardList'
import SearchBox from '../SearchBox'
import Checkbox from '../Checkbox'

export default class Navbar extends Component {
    constructor({ status:{provider}, fetchBoardList, boardList }) {
        super()

        this.state = {
            favouritesOnly: false,
            searchPhrase: ''
        }

        this.prepareForFetch = this.prepareForFetch.bind(this);
        this.toggleFavourite = this.toggleFavourite.bind(this);
        this.renderBoardlist = this.renderBoardlist.bind(this);
        this.handleSearch    = this.handleSearch.bind(this);
        this.toggleFavouriteButton = this.toggleFavouriteButton.bind(this);
        this.handleBoardlistSearch  = this.handleBoardlistSearch.bind(this);        
    }

    render() {
        const {favouritesOnly} = this.state
        const {
            status:{ providers }, 
            settings:{ NSFW }, 
            toggleSetting
        } = this.props

        return (
            <div id="navbar" className="navbar">
                {/*Section 3*/}
                <div className="navbar-content">
                    {this.renderBoardlist()}
                </div>
                <div className="navbar-controls">
                    {/*Section 1*/}
                    <div className="navbar-search">
                        <SearchBox 
                            onKeyUp={this.handleSearch} 
                            placeholder="Search..."
                        />
                    </div>
                    {/*Section 2*/}
                    <div className="navbar-filter-buttons">
                        {/*Filter favourites*/}
                        <span onClick={this.toggleFavouriteButton} className={classNames('list-toggle favourite', {'disabled': !favouritesOnly})}>
                            Favourites
                        </span>
                        <span className='list-toggle NSFW'>
                            <span className="text">18+</span>
                            <Checkbox isChecked={NSFW.value} onChange={() => toggleSetting({name:"NSFW"})}/>
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    renderBoardlist() {
        const boardlist = this.filterBoardlist()
        const elements = boardlist.map( ({provider, boardID, short_desc}) => {
            // Create each element
            const isFavourite = this.isFavourite(boardID)
            const star = classNames('mdi', 'clearfix', {
                'mdi-star': isFavourite,
                'mdi-star-outline': !isFavourite
            })

            return (
                <div key={boardID} className={"p-"+provider} onClick={
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

    filterBoardlist() {
        const { boardList, status:{ provider }, settings:{ NSFW }} = this.props;
        const { searchPhrase, favouritesOnly, providersToDisplay } = this.state
        let boardlist = boardList[provider]

        if (!boardlist || !boardlist.length)
            return []

        if (favouritesOnly) {
            // filter 'em
            boardlist = boardlist.filter( ({boardID}) => this.isFavourite(boardID))
        } 

        if (NSFW.value) {
            boardlist = boardlist.filter( ({info}) => info.NSFW)
        }

        if (searchPhrase) {
            boardlist = boardlist.filter( board => 
                board.description
                     .toLowerCase()
                     .includes(searchPhrase)
            )
        }

        return boardlist.sort((a, b) => {
            a = a.boardID.toLowerCase()
            b = b.boardID.toLowerCase()
            if (a < b)
                return -1
            if (a > b)
                return 1    
            return 0
        })
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

    handleBoardlistSearch(provider) {
        console.log("handleBoardlistSearch() clicked!");
        this.props.searchBoardlist(provider, this.state.searchWord)
    }

    toggleFavouriteButton() {
        this.setState(state => {
            return Object.assign({}, state, {favouritesOnly: !state.favouritesOnly})
        })
    }
}
