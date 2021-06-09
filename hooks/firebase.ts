import fb from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQi_NIpr-EJuk05oj1msLCqoI-hmPrJOA",
  authDomain: "nisfuddeen.firebaseapp.com",
  projectId: "nisfuddeen",
  storageBucket: "nisfuddeen.appspot.com",
  messagingSenderId: "292235175701",
  appId: "1:292235175701:web:bb75501b5a658f3aec6b1c",
  measurementId: "G-HP3MHTL5YZ"
};

export const firebase = !fb.apps.length ? fb.initializeApp(firebaseConfig) : fb.app();

export const authenticate = async() => {
  let provider = new fb.auth.GoogleAuthProvider();
  firebase.auth().languageCode = "en";
  try {
    await firebase.auth().signInWithPopup(provider);
  } catch(error){
    console.log('error occured cannot sign in');
  }
};

export const signout = async () => {
  try {
    await firebase.auth().signOut();
  } catch (err){
    console.log(err.message);
  }
}

export default fb;