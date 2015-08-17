import React from 'react';
import uuid from 'node-uuid';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.storeChanged = this.storeChanged.bind(this);
        this.state = NoteStore.getState();
    }

    componentDidMount() {
        NoteStore.listen(this.storeChanged);
    }

    componentWillUnmount() {
        NoteStore.unlisten(this.storeChanged);
    }

    storeChanged(state) {
        this.setState(state);
    }

    addItem() {
        NoteActions.create({id: uuid.v4(), task: 'New Task'});
    }

    itemEdited(noteId, task) {
        console.log('App: ', noteId);
        if(task) {
            console.log('App note id: ', noteId);
            NoteActions.update({id: noteId, task});
        } else {
            NoteActions.delete(noteId);
        }
    }

    render() {
        const notes = this.state.notes;
        return (
            <div>
                <button onClick={this.addItem}>+</button>
                <Notes items={notes} onEdit={this.itemEdited}/>
            </div>
        );
    }
}
