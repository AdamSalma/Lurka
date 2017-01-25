import React, {Component} from 'react'

export default class BoardTile extends Component {
    constructor(props) {
        super(props);
        
    }

    render() {

        const {boardID, description} = this.props
        return (
            <div className="board-tile" 
                 ref={r => this._tilt = r}
                 onMouseEnter={this.tiltOn} 
                 onMouseLeave={this.tiltOff}
            >
                <div className="title">
                    {boardID}
                </div>
                <div className="content">
                    {description}
                </div>
            </div>
        )
    }

    tiltOn(event) {
        console.log("tiltOn()")
    }

    tiltOff(event) {
        console.log("tiltOff()")

    }
}
