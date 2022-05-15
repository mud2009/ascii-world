const functions = require('firebase-functions');
const sharp = require('sharp');
const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage') 
admin.initializeApp()
const path = require('path');

const THUMB_MAX_WIDTH = 200;
const THUMB_MAX_HEIGHT = 200;

const gcs = new Storage();


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.genereateThumbnail = functions.storage.object().onFinalize( async (object) => {
  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name; // File path in the bucket.
  const contentType = object.contentType; // File content type.

  if(!contentType.startsWith("image/")){
    console.log("This is not an image")
    return null;
  }

  const fileName = path.basename(filePath);
  if (fileName.startsWith('thumb_')) {
    console.log('Already a Thumbnail.');
    return null;
  }

  const bucket = gcs.bucket(fileBucket);

  const metadata = {
    contentType: contentType,
  };

  const thumbFileName = `thumb_${fileName}`;
  const thumbFilePath = path.join(path.dirname(filePath), thumbFileName);

  const thumbnailUploadStream = bucket.file(thumbFilePath).createWriteStream({metadata});

  const pipeline = sharp();
  pipeline.resize(THUMB_MAX_WIDTH, THUMB_MAX_HEIGHT).pipe(thumbnailUploadStream);

  bucket.file(filePath).createReadStream().pipe(pipeline);

  return new Promise((resolve, reject) =>
      thumbnailUploadStream.on('finish', resolve).on('error', reject));
});