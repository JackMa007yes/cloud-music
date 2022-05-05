import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import cReducer from "./reducer";
// import { composeWithDevTools } from 'redux-devtools-extension' // 另一种方式

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(cReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;
 