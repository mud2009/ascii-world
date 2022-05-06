import React, { useState } from 'react'
import {storage} from '../firebase';

export default function UploadImage() {
  const [file, setFile] = useState(null);

  function handleChange(e) {
    if (e.target.files[0])
        setFile(e.target.files[0]);
  }

  function handleUpload(e) {
    e.preventDefault();
    const path = `/images/${file.name}`;
    const ref = storage.ref(path);
    ref.put(file);
    setFile(null);
  }
    return (
      <div>
        <form onSubmit={handleUpload}>
          <input type="file" onChange={handleChange} />
          <button disabled={!file}>upload to firebase</button>
        </form>
      </div>
    );
}

