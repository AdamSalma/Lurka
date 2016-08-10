import React from 'react';

import ThreadPost from './BoardPost';
import Background from './Background';

export default class Thread extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { isLoading, thread } = this.state
        return (
            <div>
                <Spinner isSpinning={isLoading} />
                <Background
                    className={"background " + isLoading ? "on" : "off"}
                    onThreadClose={this.onThreadClose}/>

                <div className={"thread-wrap"}>
                    <div className={"thread"}>{
                        thread.map( post => {
                            <ThreadPost post={post}/>
                    })}</div>
                </div>
            </div>
        )
    }

    onThreadClose() {}
    toggleSpinner() {}
}
