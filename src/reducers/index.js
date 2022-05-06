import postListReducer from "./post-list-reducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  mainPostList: postListReducer,
  firestore: firestoreReducer
})

export default rootReducer