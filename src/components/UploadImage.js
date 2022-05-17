import React, { useState } from 'react'
import { storage } from '../firebase';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

export default function UploadImage() {
  const [file, setFile] = useState(null);
  const [buttonText, setButtonText ] = useState("Upload Image");
  const { currentUser } = useAuth()

  function handleChange(e) {
    if (e.target.files[0]){
      setFile(e.target.files[0])
      setButtonText("Upload Image")
    }
  }

  function handleUpload(e) {
    e.preventDefault();
    const path = `/images/${file.name}`;
    var metadata = {
      customMetadata: {
        "user" : `${currentUser.displayName}`
      }
    }
    const ref = storage.ref(path);
    ref.put(file, metadata)
      .then(() => setButtonText("Uploaded!"))
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

