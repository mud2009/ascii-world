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
    // eslint-disable-next-line
  }, [])


  if (posts.length === 0){
    return(
      <>
        <h3>Loading. . .</h3>
      </>
    )
  }

  return (
    <div>
      {
        posts.sort((a,b) => b.timestamp - a.timestamp).map(x =>{
          return(
            <Post imageName={x.imageName} timestamp={x.timestamp} asciiData={x.asciiData} user={x.user} key={x.timestamp}/>
          )
        })
      }
    </div>
  );
}