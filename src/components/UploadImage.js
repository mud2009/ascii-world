import React, { useState } from 'react'
import {storage, db} from '../firebase';
import { Button, Form } from 'react-bootstrap';

export default function UploadImage() {
  const [file, setFile] = useState(null);
  const [buttonText, setButtonText ] = useState("Upload Image");
  const timestamp = Date.now();

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
      .then(() => setButtonText("Uploaded!"))
      .then(() => db.collection("posts").add({imageName: `${file.name}`, timestamp: `${timestamp}`}));
    setFile(null);
  }
    return (
      <div>
        <form onSubmit={handleUpload}>
          <Form.Control className='mb-3' type="file" onChange={handleChange} />
          <Button className='mb-3' type="submit" disabled={!file}>{buttonText}</Button>
        </form>
      </div>
    );
}

