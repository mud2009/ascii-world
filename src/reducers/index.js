import postListReducer from "./post-list-reducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";

const rootReducer = combineReducers({
  mainPostList: postListReducer,
  firestore: firestoreReducer
})

export default rootReducer