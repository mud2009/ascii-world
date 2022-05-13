import React, { useState } from 'react'
import {storage, db} from '../firebase';

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

  function convertToASCII(input){
    const ASCIICharacters = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,\"^`'.".split("")
    const charLength = ASCIICharacters.length;
    const interval = charLength / 256;

    const convertToGrey = async (colorImage) => {
      const bwImg = colorImage.gamma().greyscale();
      return bwImg
    }
    const resize = async (bw, newWidth = 500) => {
      const blackAndWhite = await bw;
      const size = await blackAndWhite.metadata();
      const ratio = size.width / size.height;
      const newHeight = parseInt(newWidth * ratio);
      const resized = await blackAndWhite.resize(newWidth, newHeight, { fit: "outside" })
      return resized;
    }
    const pixelToASCII = async img => {
      var newImg = await img;
      const pixels = await newImg.raw().toBuffer();
      const characters = "";
      pixels.foreach(pixel => {
        characters = characters + ASCIICharacters[Math.floor(pixel * interval)]
      })
      return characters;
    }
    const main = async (newWidth = 500) => {
      const newImgData = await pixelToASCII(resize(convertToGrey(input)));
      const pixels = newImgData.length;
      let ASCII = "";
      for (let i = 0; i < pixels; i += newWidth){
        let line = newImgData.split("").slice(i, i + newWidth);
        ASCII = ASCII + "\n" + line;
      }
    }
    main()
  }

  function handleUpload(e) {
    e.preventDefault();
    const blah = convertToASCII(file)
    console.log(blah);
    // const path = `/images/${file.name}`;
    // const ref = storage.ref(path);
    // ref.put(file)
    //   .then(() => setButtonText("Uploaded!"))
    //   .then(() => db.collection("posts").add({imageName: `${file.name}`, timestamp: `${timestamp}`}));
    // setFile(null);
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

