import React from "react";
import Post from "./Post";
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase'

function PostList(){
  useFirestoreConnect([
    { collection: 'posts' }
  ]);

  const posts = useSelector(state => state.firestore.ordered.posts)

  if (isLoaded(posts)){
    return(
      <React.Fragment>
        {posts.map(post => {
          return <Post 
            imageName = {post.imageName}
            timestamp = {post.timestamp}
            key={post.imageName}
            />
        })}
      </React.Fragment>
    )  
  } else {
    return(
      <React.Fragment>
        <div>Loading....</div>
      </React.Fragment>
    )  

  }
}

export default PostList;