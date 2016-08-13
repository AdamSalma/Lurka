import React from 'react';

import ThreadPost from './BoardPost';

export default class Thread extends React.Component {
    constructor() {
        super();
        this.state = {
            thread: []
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log("Thread received nextProps");
    //     console.log(nextProps);
    //     const { thread } = nextProps
    //     if ( !nextProps.thread ) return false;
    //     if
    //     this.setState({
    //         thread: nextProps.data.posts
    //     })
    // }

    shouldComponentUpdate() {
        console.log(`Should thread update? ${!!this.props.thread}`)
        if (!this.props.thread.length) return false
        return true
    }

    render() {
        console.log("Render Thread");
        const { isLoading, thread } = this.state
        console.log(isLoading, thread);
        return (
            <div className={"thread-wrap"}>
                <div className={"thread"}>{
                    thread.map( post => {
                        <ThreadPost post={post}/>
                    })
                }</div>
            </div>
        )
    }
}
