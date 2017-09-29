import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBpdZgXBTUVYxpeY2d4rZeb8WDBjBoP1Sk",
  authDomain: "fiskekartan-957ed.firebaseapp.com",
  databaseURL: "https://fiskekartan-957ed.firebaseio.com",
  projectId: "fiskekartan-957ed",
  storageBucket: "fiskekartan-957ed.appspot.com",
  messagingSenderId: "522321006827"
};

export const initFirebase = () => {
  const fire = firebase.initializeApp(config);
};

export const googleLogin = (onSuccess, onFailure) => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(onSuccess)
    .catch(onFailure);
};

export const loginWithEmailAndPassword = (onSuccess, onFailure, user) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(user.username, user.password)
    .then(onSuccess)
    .catch(onFailure);
};

export const signOutUser = (onSuccess, onFailure) =>{
  firebase
      .auth()
      .signOut()
      .then(onSuccess)
      .catch(onFailure);
}

export const registerUser = (onSuccess, onFailure, user) =>{
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.username, user.password)
      .then(onSuccess)
      .catch(onFailure);
}