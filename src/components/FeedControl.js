import UploadImage from "./UploadImage";
import PostList from "./PostList";
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase'
import React from "react";
import PropTypes from "prop-types";

class FeedControl extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      uploadVisible: false
    };
  }

  handleClick = () => {
    this.setState(prevState => ({
      uploadVisible: !prevState.uploadVisible
    }))
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.uploadVisible){
      currentlyVisibleState = <UploadImage/>
      buttonText="Return to feed"
    } else {
      currentlyVisibleState = <PostList postList={this.props.mainPostList}/>
      buttonText="Upload image"
    }
    return(
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    )
  }
}

FeedControl.propTypes = {
  mainPostList: PropTypes.object
}
const mapStateToProps = state => {
  return {
    mainPostList: state,
  }
}

FeedControl = connect(mapStateToProps)(FeedControl)

export default withFirestore(FeedControl)