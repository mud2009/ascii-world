import React from 'react'
import UploadImage from "./UploadImage";
import PostList from "./PostList";

class FeedControl extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      uploadVisible: false,
    };
  }

  render(){
    let buttonText = null;
    let currentlyVisibleState = null;

    if (this.state.uploadVisible) {
      currentlyVisibleState = <UploadImage />;
      buttonText = "Return to Feed";
    } else {
      currentlyVisibleState = (
        <PostList/>
      );
      buttonText = "Upload Image";
    }

    return(
      <div>
        {currentlyVisibleState}
        <button>{buttonText}</button>
      </div>
    )
  }
}

export default FeedControl;