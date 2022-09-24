import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers, createStore } from "redux";
import userReducer from "./users/userReducer";

const rootReducer = combineReducers({
    User: userReducer
})

const store = createStore(rootReducer, composeWithDevTools());

export default store;