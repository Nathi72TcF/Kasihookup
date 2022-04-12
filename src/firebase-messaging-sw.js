importScripts('https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js');
 
firebase.initializeApp({
    apiKey: "AIzaSyAj9SZzow2DGl3s25H4VvSkxxzpwTO8rU0",
    authDomain: "kasihookup.firebaseapp.com",
    projectId: "kasihookup",
    storageBucket: "kasihookup.appspot.com",
    messagingSenderId: "1012700629802",
    appId: "1:1012700629802:web:3ba6aed2932727a41eac53",
    measurementId: "G-79GRP6CBZ0"
});
 
const messaging = firebase.messaging();