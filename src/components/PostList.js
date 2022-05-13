import React, { useState, useEffect } from "react";
import Post from "./Post";
import { db } from "../firebase"

export default function PostList(){
  const [posts, setPosts] = useState([])

  const ref = db.collection("posts")

  function getPosts() {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setPosts(items);
    });
  }

  useEffect(() => {
    getPosts();
  }, [])


  return (
    <div>
      {
        posts.map(x =>{
          return(
            <Post imageName={x.imageName} timestamp={x.timestamp} key={x.timestamp}/>
          )
        })
      }
    </div>
  );

  // if (isLoaded(posts)){
  //   return(
  //     <React.Fragment>
  //       {posts.map(post => {
  //         return <Post 
  //           imageName = {post.imageName}
  //           timestamp = {post.timestamp}
  //           key={post.imageName}
  //           />
  //       })}
  //     </React.Fragment>
  //   )  
  // } else {
  //   return(
  //     <React.Fragment>
  //       <div>Loading....</div>
  //     </React.Fragment>
  //   )  

  // }
}