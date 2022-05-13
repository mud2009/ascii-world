const functions = require('firebase-functions');
const sharp = require('sharp');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


// function convertToASCII(input){
//   const ASCIICharacters = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,\"^`'.".split("")
//   const charLength = ASCIICharacters.length;
//   const interval = charLength / 256;

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