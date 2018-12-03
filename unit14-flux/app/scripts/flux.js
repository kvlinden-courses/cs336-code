import $ from 'jquery';
import { createStore } from 'redux';

import { API_URL, POLL_INTERVAL } from './global';

let StoreTools = {
    // These routines interact with the database service.
    loadCommentsFromServer: function() {
        $.ajax({
            url: API_URL,
            dataType: 'json',
            cache: false,
        })
         .done(function(result){
             store.dispatch(ActionTools.loadedComments(result));
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             console.error(this.props.url, status, errorThrown.toString());
         }.bind(this));
        setInterval(this.loadCommentsFromServer, POLL_INTERVAL);
    },
    addCommentToServer: function(comment) {
        $.ajax({
            url: API_URL,
            dataType: 'json',
            type: 'POST',
            data: comment,
        })
         .done(function(result){
             store.dispatch(ActionTools.loadedComments(result));
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             console.error(API_URL, status, errorThrown.toString());
         }.bind(this));
    },
    editCommentOnServer: function(comment) {
        // Remove the ID (from a cloned comment); the user can't edit the ID and the server gets it from the URL.
        let localComment = Object.assign({}, comment);
        let id = localComment.id;
        delete localComment.id;
        $.ajax({
            url: API_URL + "/" + id,
            dataType: 'json',
            type: 'PUT',
            data: localComment
        })
         .done(function(result){
             store.dispatch(ActionTools.loadedComments(result));
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             console.error(API_URL, status, errorThrown.toString());
         }.bind(this));
    },
    deleteCommentOnServer: function(id) {
        $.ajax({
            url: API_URL + "/" + id,
            type: 'DELETE',
        })
         .done(function(result){
             store.dispatch(ActionTools.loadedComments(result));
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             console.error(API_URL, status, errorThrown.toString());
         }.bind(this));
    },
    // These routines automate simple comment-list operations.
    findComment: function(id, commentList) {
        for (var comment of commentList) {
            if (comment.id == id) {
                return { id: id, author: comment.author, text: comment.text };
            }
        }
        return { id: '',  author: '', text: '' };
    },
    addCommentInList: function(commentList, comment) {
        return commentList.concat(comment);
    },
    deleteCommentInList: function(commentList, id) {
        commentList.filter(function(comment) {
            return comment.id !== id;
        });
        return commentList;
    },
    editCommentInList: function(commentList, comment) {
        this.deleteCommentInList(commentList, comment.id);
        commentList.push(comment);
        return commentList;
    }
};

let ActionTools = {
    // We hard-code the database access functions here for simplicity. They
    // really should be handled using middleware, e.g.,  thunk, sagas.
    loadedComments: function(comments) {
        return {
            type: 'LOADED_COMMENTS',
            comments: comments
        };
    },
    addComment: function(comment) {
        StoreTools.addCommentToServer(comment);
        return {
            type: 'ADD_COMMENT',
            comment: comment
        };
    },
    editComment: function(comment) {
        StoreTools.editCommentOnServer(comment);
        return {
            type: 'EDIT_COMMENT',
            comment: comment
        };
    },
    deleteComment: function(id) {
        StoreTools.deleteCommentOnServer(id);
        return {
            type: 'DELETE_COMMENT',
            id: id
        };
    }
};

let Reducers = {
    // We don't include a loading-comments reducer because it would require a non-pure
    // AJAX call. Only loaded-comments is needed, and that's handled in the dispatch
    // utility function below. The examples on-line use a loading-comments reducer to
    // initiate a "loading..." icon, which we don't currently implement in this application.
    addComment: function(state, action) {
        return Object.assign({}, state, {
            data: StoreTools.addCommentInList([].concat(state.data), action.comment)
        });
    },
    editComment: function(state, action) {
        return Object.assign({}, state, {
            data: StoreTools.editCommentInList([].concat(state.data), action.comment)
        });
    },
    deleteComment: function(state, action) {
        return Object.assign({}, state, {
            data: StoreTools.deleteCommentInList([].concat(state.data), action.id)
        });
    }
};

function commentsApp(state, action) {
    switch (action.type) {
        case 'LOADED_COMMENTS':
            return { data: action.comments };
        case 'ADD_COMMENT':
            return Reducers.addComment(state, action);
        case 'EDIT_COMMENT':
            return Reducers.editComment(state, action);
        case 'DELETE_COMMENT':
            return Reducers.deleteComment(state, action);
        default:
            return state;
    }
}

let defaultState = {
    data: []
};

let store = createStore(commentsApp, defaultState);

module.exports = { StoreTools, ActionTools, store };
