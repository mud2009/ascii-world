import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap"

function Post(props){
  
  return(
    <Card className="image-post mb-3">
      <Card.Body>
        <h2 id="poster">{props.user}</h2>
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