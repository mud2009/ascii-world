import React from "react";
import PropTypes from "prop-types";
// import { storage } from "../firebase"
import { Card } from "react-bootstrap"

function Post(props){
  // var pathReference = storage.ref(`images/${props.imageName}`);
  // pathReference.getDownloadURL().then((url) => {
  //   var img = document.getElementById('myimg' + props.imageName);
  //   img.setAttribute('src', url);
  // })
  // .catch((error) => {
  //   switch (error.code) {
  //     case 'storage/object-not-found':
  //       break;
  //     case 'storage/unauthorized':
  //       break;
  //     case 'storage/canceled':
  //       break;  
  //     case 'storage/unknown':
  //       break;
  //     default:
  //       break;
  //   }
  // });
  
  return(
    <Card className="image-post mb-3">
      <Card.Body>
        <h2 id="poster">{props.user}</h2>
        {/* <img className="center-block" id={`myimg${props.imageName}`} alt={`${props.imageName}`}/> */}
        <pre>
          {props.asciiData}
        </pre>
        <h5>{props.imageName}</h5>
      </Card.Body>
    </Card>
  )
}

Post.propTypes = {
  imageName: PropTypes.string,
  timestamp: PropTypes.string,
  asciiData: PropTypes.string,
  user: PropTypes.string
}

export default Post;