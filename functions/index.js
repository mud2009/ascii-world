const functions = require('firebase-functions');
const sharp = require('sharp');
const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage') 
const { tmpdir } = require('os')
const fs = require("fs-extra")

admin.initializeApp()

const path = require('path');
const { join } = require('path');
const gcs = new Storage();

const ASCIICharacters = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,\"^`'. ".split("")
const charLength = ASCIICharacters.length;
const interval = charLength / 256

exports.addASCIIToFirestore = functions.storage.object().onFinalize(async (object) => {
  const bucket = gcs.bucket(object.bucket); // The Storage bucket that contains the file.
  const filePath = object.name;
  const fileName = object.name.replace("images/", "");
  const contentType = object.contentType; // File content type.
  const firestoreRef = admin.firestore().collection("posts")
  const timestamp = Date.now();
  let asciiData = ""

  const workingDir = join(tmpdir(), "temp")
  const tmpFilePath = join(workingDir, "source.jpg")

  if(!contentType.startsWith("image/")){
    console.log("This is not an image")
    return null;
  }

  await fs.ensureDir(workingDir);

  await fileBucket.file(filePath).download({
    destination: tmpFilePath
  })

  const sharpImg = await sharp(tmpFilePath);

  const greyConvert = async (input)=> {
    input.gamma().grayscale()
    return greyImg
  } 

  const resize = async (greyImg, newWidth = 500) => {
    const bw = await greyImg;
    const size = await bw.metadata();
    const ratio = size.width / size.height;
    const newHeight = parseInt(newWidth * ratio);
    const resized = await bw.resize(newWidth, newHeight, { fit: "outside"});
    return resized;
  }

  const toASCII = async (resized) => {
    var newImg = await resized;
    const pixels = await newImg.raw().toBuffer();
    let characters = "";
    pixels.foreach(pixel => {
      characters = characters + ASCIICharacters[Math.floor(pixel * interval)]
    })
    return characters;
  }

  const main = async (input) => {
    let newWidth = 500;
    const newImgData = await toASCII(resize(greyConvert(input)));
    const pixels = newImgData.length;
    for (let i = 0; i < pixels; i += newWidth){
      let line = newImgData.split("").slice(i, i + newWidth);
      asciiData = asciiData + "\n" + line
    }
    firestoreRef.add({ timestamp: `${timestamp}`, imageName: `${fileName}`, asciiData: `${asciiData}` })
  }

  main(sharpImg);

  return fs.remove(workingDir);
});

// function convertToASCII(input){

//   // const convertToGrey = async (colorImage) => {
//   //   const bwImg =  colorImage.gamma().greyscale();
//   //   return bwImg
//   // }
//   const resize = async (bw, newWidth = 500) => {
//     const blackAndWhite = await bw;
//     const size = await blackAndWhite.metadata();
//     const ratio = size.width / size.height;
//     const newHeight = parseInt(newWidth * ratio);
//     const resized = await blackAndWhite.resize(newWidth, newHeight, { fit: "outside" })
//     return resized;
//   }
//   const pixelToASCII = async img => {
//     var newImg = await img;
//     const pixels = await newImg.raw().toBuffer();
//     const characters = "";
//     pixels.foreach(pixel => {
//       characters = characters + ASCIICharacters[Math.floor(pixel * interval)]
//     })
//     return characters;
//   }
//   const main = async (newWidth = 500) => {
//     const newImgData = await pixelToASCII(resize(input));
//     const pixels = newImgData.length;
//     let ASCII = "";
//     for (let i = 0; i < pixels; i += newWidth){
//       let line = newImgData.split("").slice(i, i + newWidth);
//       ASCII = ASCII + "\n" + line;
//     }
//   }
//   main()
// }

  // const fileName = path.basename(filePath);

  // const bucket = gcs.bucket(fileBucket);

  // const metadata = {
  //   contentType: contentType,
  // };

  // const thumbFileName = `thumb_${fileName}`;
  // const thumbFilePath = path.join(path.dirname(filePath), thumbFileName);

  // const thumbnailUploadStream = bucket.file(thumbFilePath).createWriteStream({metadata});

  // const pipeline = sharp();
  // pipeline.resize(THUMB_MAX_WIDTH, THUMB_MAX_HEIGHT).pipe(thumbnailUploadStream);

  // bucket.file(filePath).createReadStream().pipe(pipeline);

  // return new Promise((resolve, reject) =>
  //     thumbnailUploadStream.on('finish', resolve).on('error', reject));
