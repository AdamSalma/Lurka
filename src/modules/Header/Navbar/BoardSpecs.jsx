import React, {
    PureComponent,
    PropTypes
} from 'react';

import {
    Icon,
    Elipses
} from '~/components';

class BoardSpecs extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
    };

    static defaultProps = {

    }

    constructor(props) {
        super(props);
        this.state = {
            title: null,
            posts: 141,
            replies: 4583,
            images: 1203,
        }

        this.specStyles = {
            fontSize: '12px',
            color: '#fff',
            position: 'relative',
            top: '22px',
            position: 'absolute',
            right: 0,
            left: 0,
        }

        this.titleStyles = {
            position: 'relative',
            top: '-6px'
        }
    }

    // componentWillUpdate(nextProps) {
    //     this.update(nextProps)
    // }

    render() {
        const {
            posts,
            images,
            replies
        } = this.state

        return (
            <div
              className='BoardSpecs'
              onClick={() => {
                           console.log('boardspecs'); this.props.onClick();
                       }}>
              <div className='BoardSpecs__title'>
                {this.props.title}
              </div>
              <div
                className='BoardSpecs__specs'
                style={this.titleStyles}>
                {this.renderStats()}
              </div>
            </div>
        )
    }

    renderStats() {
        if (this.props.boardIsFetching) {
            return (
                <div
                  className='BoardSpecs__specs'
                  style={this.specStyles}>
                  <Elipses>
                    Loading board
                  </Elipses>
                </div>
            )
        }

        if (this.props.threadIsFetching) {
            return (
                <div
                  className='BoardSpecs__specs'
                  style={this.specStyles}>
                  <Elipses>
                    Loading thread
                  </Elipses>
                </div>
            )
        }

        return (
            <div
              className='BoardSpecs__specs'
              style={this.specStyles}>
              <span>{this.state.posts}</span>
              <span>/ {this.state.images}</span>
              <span>/ {this.state.replies}</span>
            </div>
        )
    }

    update(nextProps) {
        const board = this.getBoard(nextProps)

        if (!board)
            return

        const {
            posts,
            images,
            replies
        } = this.getSpecs(board)

        this.setState({
            title: board.short_desc,
            posts: nextProps.boardList.items.length,
            images: 1253,
            replies: 4020
        })
    }

    getBoard({
            boardID,
            boardList
        }) {
        boardID && boardList.items && boardList.items.find(b => b.boardID === boardID).short_desc
    }

// getPosts(board) {
//     let posts = 0
//     board.
// }
}

export default BoardSpecs;

