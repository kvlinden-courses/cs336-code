import React from 'react';

import CommentList from './commentList';
import CommentForm from './commentForm';
import { store, ActionTools } from './flux';

module.exports = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    handleCommentSubmit: function(comment) {
        // To add a comment to the store, we configure the new comment
        // and dispatch an ADD action.
        var comments = this.state.data;
        comment.id = Date.now();
        var newComments = comments.concat([comment]);
        // Optimistically add the new comment to the list.
        this.setState({data: newComments});
        store.dispatch(ActionTools.addComment(comment));
    },
    componentWillMount() {
        // Register to be notified for all changes to the store.
        this.unsubscribe = store.subscribe(() => {
            this.setState({
                data: store.getState().data
            });
        });
    },
    componentWillUnmount: function() {
        this.unsubscribe();
    },
    render: function() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});
