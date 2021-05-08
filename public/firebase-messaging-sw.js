importScripts('https://www.gstatic.com/firebasejs/8.4.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.4.3/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyD99Rah18BDGr0za5o5MTHPO3XXVhyLtdo",
    authDomain: "foodplan-1292f.firebaseapp.com",
    databaseURL: "",
    projectId: "foodplan-1292f",
    storageBucket: "foodplan-1292f.appspot.com",
    messagingSenderId:  "537174655509",
    appId: "1:537174655509:web:f2702e239be921ba9d841c",
    measurementId: "G-K5TPV5LH14"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();