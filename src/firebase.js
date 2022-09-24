import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzkN7MnuUuEdo1JdNK6X5ItmCXbJ59DPA",
  authDomain: "anonymous-chatting-app.firebaseapp.com",
  projectId: "anonymous-chatting-app",
  storageBucket: "anonymous-chatting-app.appspot.com",
  messagingSenderId: "1098007538894",
  appId: "1:1098007538894:web:e79f442110ac8bb414349f",
  measurementId: "G-YBRFZ75PM1",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const db = firebaseApp.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;