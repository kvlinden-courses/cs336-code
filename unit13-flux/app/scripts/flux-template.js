// Inflate this template according to the instructions given in lab 13.

import { createStore } from 'redux';

import { API_URL, POLL_INTERVAL } from './global';

let StoreTools = {
    // TODO - Useful utility functions for the state representation
};

let ActionTools = {
    // TODO - Utilities for creating action specifications
};

let Reducers = {
    // TODO - Reducer functions
};

function commentsApp(state, action) {
    switch (action.type) {
        // TODO - Switchboard entries that connect a dispatched action to its reducer
        default:
            return state;
    }
}

let defaultState = {
    // TODO - State representation
};

let store = createStore(commentsApp, defaultState);

module.exports = { StoreTools, ActionTools, store };