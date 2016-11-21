import React, { Component } from 'react';

class SearchBox extends Component {
    render() {
        return (
            <div className="searchbox">
                <span className="mdi mdi-magnify"></span>
                <input type="text" className="searchbox-content" {...this.props}/>
            </div>
        )
    }
}

export default SearchBox