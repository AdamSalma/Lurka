import React from 'react';
import Notes from './Notes';
import idGen from './idGen';

export class App extends React.Component {
    constructor(){
        super()
        this.addNote = this.addNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.state = {
            notes: [
                {
                    id: idGen(),
                    task: `Original Task`
                }
            ]
        }
    }

	render() {
        const {notes} = this.state
        return (
            <div>
                <button onClick={this.addNote}>+</button>
                <Notes notes={notes} onDelete={this.deleteNote}/>
            </div>
        )
    }

    addNote() {
        this.setState({
            notes: this.state.notes.concat([{
                id: idGen(),
                task: 'New task'
            }])
        });
    }

    deleteNote( id, e ) {
        e.stopPropagation();
        this.setState({
            notes: this.state.notes.filter(note => note.id !== id)
        })
    }


}
