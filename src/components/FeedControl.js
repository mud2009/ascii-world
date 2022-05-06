import React, {useState} from 'react'
import UploadImage from "./UploadImage";
import PostList from "./PostList";

export default function FeedControl(){

    let [ uploadVisible, setUploadVisible] = useState(false)

    if (uploadVisible) {
      return(
        <div>
          <UploadImage/>
          <button onClick={() => setUploadVisible(!uploadVisible)}>Return to feed</button>
        </div>
      )
    } else {
      return(
        <div>
          <PostList/>
          <button onClick={() => setUploadVisible(!uploadVisible)}>Upload Image</button>
        </div>
      )
  }
}