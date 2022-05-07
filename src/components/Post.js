import React from "react";
import PropTypes from "prop-types";
import { storage } from "../firebase"

function Post(props){
  var pathReference = storage.ref(`images/${props.imageName}`);
  pathReference.getDownloadURL().then((url) => {
    var img = document.getElementById('myimg' + props.imageName);
    img.setAttribute('src', url);
  })
  .catch((error) => {
    switch (error.code) {
      case 'storage/object-not-found':
        break;
      case 'storage/unauthorized':
        break;
      case 'storage/canceled':
        break;  
      case 'storage/unknown':
        break;
    }
  });
  
  return(
    <React.Fragment>
      <img id={`myimg${props.imageName}`} alt={`${props.imageName}`}/>
      <h3>Name: {props.imageName} - Time: {props.timestamp}</h3>
    </React.Fragment>
  )
}

Post.propTypes = {
  imageName: PropTypes.string,
  timestamp: PropTypes.string
}

export default Post;