import './Navbar.styles'
import React, {Component} from 'react'
import classes from 'classnames'
import uuid from 'uuid'

import {
    Icon, 
    BoardList, 
    BoardInfo,
    SearchBox, 
    Checkbox,
    Overlay,
} from '../../components'

import {bindMembersToClass} from '~/utils'

export default class Navbar extends Component {
    constructor({ status:{provider}, fetchBoardList, boardList }) {
        super()

        this.state = {
            favouritesOnly: false,
            searchPhrase: '',
            showBoardInfo: false,

        }

        bindMembersToClass(this, 
            'prepareForFetch',
            'toggleFavourite',
            'renderBoardlist',
            'handleSearch',
            'toggleFavourites',
            'searchBoardlist',
            'handleBoardMouseEnter',
            'handleBoardMouseLeave'
        )

    }

    componentDidUpdate(prevProps, prevState) {
        const {isNavbarOpen} = this.props.status
        if (isNavbarOpen && !prevProps.status.isNavbarOpen) {
            console.warn(this)
            console.warn(this._searchBox)
            this._searchBox && this._searchBox.focus()
        }
    }

    setSearchBoxRef(c) {
        if (c) {
            console.info("Setting navbar>searchbox ref:", c)
            this._searchBox = c
            console.info(this._searchBox)
        } else {
            console.info("navbar>searchbox was null")
        }
    }

    render() {
        const {favouritesOnly} = this.state
        const {
            toggleSetting, toggleNavbar,
            status:{ isNavbarOpen }, 
            settings:{ NSFW }, 
        } = this.props

        const favClasses = classes('list-toggle favourite', {'disabled': !favouritesOnly})

        return (
            <div id="navbar" className="Navbar">
                <Overlay isVisible={isNavbarOpen} onClick={toggleNavbar}/>
                {this.renderBoardInfo()}
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
                            ref={this.setSearchBoxRef}
                        />
                    </div>
                    {/*Section 2*/}
                    <div className="navbar-filter-buttons">
                        {/*Filter favourites*/}
                        <span onClick={this.toggleFavourites} className={favClasses}>
                            Favourites only
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
            const star = classes('mdi', 'clearfix', {
                'mdi-star': isFavourite,
                'mdi-star-outline': !isFavourite
            })

            return (
                <div key={boardID} className={"p-"+provider} 
                    onClick={this.prepareForFetch.bind(null, provider, boardID)}
                    onMouseEnter={this.handleBoardMouseEnter.bind(null, boardID)}
                    onMouseLeave={this.handleBoardMouseLeave}
                >
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

    _getBoardlist(props){
        return props.boardList[props.status.provider]
    }

    handleBoardMouseEnter(boardID) {
        this.setState({
            showBoardInfo: true,
            selectedBoardID: boardID
        })
    }

    handleBoardMouseLeave(e) {
        this.setState({
            showBoardInfo: false,
            selectedBoardID: null
        })
    }

    renderBoardInfo() {
        const {showBoardInfo, selectedBoardID} = this.state

        if (showBoardInfo && this.props.status.isNavbarOpen) {
            const board = this._getBoardlist(this.props).find(
                el => el.boardID === selectedBoardID
            )

            return board && board.info && <BoardInfo
                {...board.info}
            />
        }
        return null
    }

    prepareForFetch(provider, boardID) {
        const {closeThread, scrollHeader, changeProvider, fetchBoard, toggleNavbar} = this.props;

        fetchBoard({boardID, provider})
        closeThread(() => toggleNavbar({open: false}))
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

    toggleFavourite(event, provider="4chan", boardID) {
        // check if board is in favourites
        event.stopPropagation()

        if (this.isFavourite(provider, boardID)) {
            console.log(`removeFromFavourites() ${provider} ${boardID}`)
            this.props.removeFromFavourites(provider, boardID)
        } 

        else {
            console.log(`addToFavourites() ${provider} ${boardID}`)
            this.props.addToFavourites(provider, boardID)
        }
    }

    isFavourite(boardID) {
        // Checks if board is in favourites. Return bool
        return !!this.props.boardList['favourites']
                     .find( board => board.boardID === boardID )
    }

    handleSearch(event) {
        const searchPhrase = event.target.value.toLowerCase()
        this.setState({searchPhrase})
    }

    searchBoardlist(provider) {
        console.log("searchBoardlist() clicked!");
        this.props.searchBoardlist(provider, this.state.searchWord)
    }

    toggleFavourites() {
        this.setState(state => {
            return Object.assign({}, state, {favouritesOnly: !state.favouritesOnly})
        })
    }
}
