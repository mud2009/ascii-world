const functions = require('firebase-functions');
const sharp = require('sharp');
const admin = require('firebase-admin');
admin.initializeApp()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.onFileChangeDemo = functions.storage.object().onFinalize((event) => {
  console.log("This is the event" + event)
  return;
});