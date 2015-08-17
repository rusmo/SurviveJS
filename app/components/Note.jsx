import React from 'react';

export default class Note extends React.Component {
    constructor(props) {
        super(props);

        this.finishEdit = this.finishEdit.bind(this);
        this.checkEnter = this.checkEnter.bind(this);
        this.edit = this.edit.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
	    this.renderValue = this.renderValue.bind(this);

        this.state = {
            editing: false
        };
    }

	render() {
	    const isEditing = this.state.editing;

	    return (
            <div>
        	{isEditing ? this.renderEdit() : this.renderValue()}
            </div>
	    );
	}

    renderEdit() {
        return <input type='text'
                      autoFocus={true}
                      defaultValue={this.props.value}
                      onBlur={this.finishEdit}
                      onKeyPress={this.checkEnter} />;
    }

    renderValue() {
        return <div onClick={this.edit}>{this.props.value}</div>;
    }

    edit() {
        this.setState({
            editing: true
        });
    }

    checkEnter(e) {
        if(e.key === 'Enter') {
            this.finishEdit(e);
        }
    }

    finishEdit(e) {
        this.props.onEdit(e.target.value);
        this.setState({
            editing: false
        });
    }
}