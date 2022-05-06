import React, { useState } from 'react'
import {firebase, storage, db} from '../firebase';

export default function UploadImage() {
  const [file, setFile] = useState(null);
  const [buttonText, setButtonText ] = useState("Upload Image");
  const timestamp = Date.now()

  function handleChange(e) {
    if (e.target.files[0]){
      setFile(e.target.files[0])
      setButtonText("Upload Image")
    }
  }

  function handleUpload(e) {
    e.preventDefault();
    const path = `/images/${file.name}`;
    const ref = storage.ref(path);
    ref.put(file)
      .then(snapshot => setButtonText("Uploaded!"))
      .then(snapshot => db.collection("posts").add({imageName: `${file.name}`, timestamp: `${timestamp}`}));
    setFile(null);
  }
    return (
      <div>
        <form onSubmit={handleUpload}>
          <input type="file" onChange={handleChange} />
          <button disabled={!file}>{buttonText}</button>
        </form>
      </div>
    );
}

