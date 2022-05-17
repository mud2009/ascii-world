const functions = require('firebase-functions');
const sharp = require('sharp');
const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage') 
const os = require('os')
const fs = require("fs-extra")

admin.initializeApp()

const path = require('path');

const ASCIICharacters = " .:-=+*#%@".split("").reverse();
const charLength = ASCIICharacters.length;
const interval = charLength / 256

exports.addASCIIToFirestore = functions.storage.object().onFinalize(async (object) => {
  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name;
  const fileName = path.basename(filePath);
  const contentType = object.contentType; // File content type.
  const firestoreRef = admin.firestore().collection("posts")
  const timestamp = Date.now();
  let asciiData = ""
  let uploadUser = ""
  let uploadEmail = ""


  if(!contentType.startsWith("image/")){
    console.log("This is not an image")
    return null;
  }

  const bucket = admin.storage().bucket(fileBucket)
  const myFileRef = bucket.file(filePath)

  myFileRef.getMetadata().then(x => {
    uploadUser = x[0].metadata["user"]
    uploadEmail = x[0].metadata["email"]
    return null
  }).catch(error => {
    console.log("metadata error =" + error)
  })

  const tempFilePath = path.join(os.tmpdir(), fileName)

  try {
    const download = await bucket.file(filePath).download({destination: tempFilePath})
  } catch (error) {
    console.log('err at download bucket', error);
  }

  const sharpImg = await sharp(tempFilePath);

  const greyConvert = async (input)=> {
    input.gamma().grayscale().normalise();
    return input
  } 

  const resize = async (greyImg, newWidth = 150) => {
    const bw = await greyImg;
    const size = await bw.metadata();
    const ratio = size.width / size.height;
    const newHeight = parseInt(newWidth / ratio);
    const resized = await bw.resize(newWidth, newHeight, { fit: "fill"});
    return resized;
  }

  const toASCII = async (resized) => {
    var newImg = await resized;
    const pixels = await newImg.raw().toBuffer();
    let characters = [];
    pixels.forEach(pixel => {
      characters.push(ASCIICharacters[Math.floor(pixel * interval)])
    })
    return characters.join("");
  }

  const main = async (input) => {
    let newWidth = 150;
    const newImgData = await toASCII(resize(greyConvert(input)));
    const pixels = newImgData.length;
    for (let i = 0; i < pixels; i += newWidth){
      let line = newImgData.split("").slice(i, i + newWidth);
      asciiData = asciiData + "\n" + line.join("")
    }
    firestoreRef.add({ timestamp: `${timestamp}`, imageName: `${fileName}`, asciiData: `${asciiData}`, user: `${uploadUser}`, email: `${uploadEmail}` })
  }

  await main(sharpImg);

  await admin.storage().bucket().file(filePath).delete();

  return fs.unlinkSync(tempFilePath);
});