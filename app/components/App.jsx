import AltContainer from 'alt/AltContainer';
import React from 'react';
import uuid from 'node-uuid';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

export default class App extends React.Component {
    render() {
        const notes = this.props.notes;
        return (
            <div>
                <button onClick={this.addItem}>+</button>
                <AltContainer
                    stores={[NoteStore]}
                    inject={{
                        items: () => NoteStore.getState().notes
                    }}
                >
                    <Notes items={notes} onEdit={this.itemEdited}/>
                </AltContainer>
            </div>
        );
    }

    addItem() {
        NoteActions.create({id: uuid.v4(), task: 'New Task'});
    }

    itemEdited(noteId, task) {
        console.log('App: ', noteId);
        if (task) {
            console.log('App note id: ', noteId);
            NoteActions.update({id: noteId, task});
        } else {
            NoteActions.delete(noteId);
        }
    }
}
