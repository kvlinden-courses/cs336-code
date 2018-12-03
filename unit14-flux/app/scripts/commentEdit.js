import React from 'react';
import {Link} from 'react-router';

import {store, ActionTools, StoreTools} from './flux';

module.exports = React.createClass({
    // We keep a local state for component operation.
    getInitialState: function () {
        return {author: '', text: ''};
    },
    componentDidMount: function () {
        // The store is read-only, so we can read from it directly.
        let commentToEdit =
            StoreTools.findComment(this.props.params.id, store.getState().data);
        this.setState({author: commentToEdit.author, text: commentToEdit.text});
    },
    handleAuthorChange: function (e) {
        this.setState({author: e.target.value});
    },
    handleTextChange: function (e) {
        this.setState({text: e.target.value});
    },
    contextTypes: {
        router: React.PropTypes.object
    },
    handleUpdate: function () {
        // To edit a comment in the store, we get the new comment
        // and dispatch an EDIT action.
        var updatedComment = {
            id: Number(this.props.params.id),
            author: this.state.author.trim(),
            text: this.state.text.trim()
        };
        store.dispatch(ActionTools.editComment(updatedComment));
        this.context.router.push('/');
    },
    handleDelete: function () {
        // To delete a comment in the store, we dispatch a DELETE action.
        store.dispatch(ActionTools.deleteComment(Number(this.props.params.id)));
        this.context.router.push('/');
    },
    render: function () {
        return (
            <div>
                <form className="commentForm">
                    <h1>Comment Edit - {this.props.params.id}</h1>
                    <input
                        type="text"
                        value={this.state.author}
                        onChange={this.handleAuthorChange}
                    />
                    <input
                        type="text"
                        value={this.state.text}
                        onChange={this.handleTextChange}
                    />
                    <button type="button" onClick={this.handleUpdate}>Update
                    </button>
                    <button type="button" onClick={this.handleDelete}>Delete
                    </button>
                </form>
                <Link to='/'>Cancel</Link>
            </div>
        );
    }
});
