// Add this code to flux.js according to the instruction given in the lab.

let Reducers = {

    loadingComments: function() {
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
    },
    addComment: function(action) {
        $.ajax({
            url: API_URL,
            dataType: 'json',
            type: 'POST',
            data: action.comment,
        })
            .done(function(result){
                // Do nothing; the comment is optimistially displayed
                // already and will refresh on the next poll.
            }.bind(this))
            .fail(function(xhr, status, errorThrown) {
                console.error(API_URL, status, errorThrown.toString());
            }.bind(this));
    },
    editComment: function(action) {
        $.ajax({
            url: API_URL + "/" + action.id,
            dataType: 'json',
            type: 'PUT',
            data: action.comment
        })
            .done(function(comments){
                // Do nothing; the comment is optimistially displayed
                // already and will refresh on the next poll.
            }.bind(this))
            .fail(function(xhr, status, errorThrown) {
                console.error(API_URL, status, errorThrown.toString());
            }.bind(this));
    }
};