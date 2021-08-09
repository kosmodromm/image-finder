import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from "firebase";
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp(
    {
    apiKey: "AIzaSyCR3RhUsGfuhQV16M1yw5keF_gsRgU3oFo",
    authDomain: "image-finder-ff28f.firebaseapp.com",
    projectId: "image-finder-ff28f",
    storageBucket: "image-finder-ff28f.appspot.com",
    messagingSenderId: "988015902466",
    appId: "1:988015902466:web:98c250e899e57ce88e4c1b",
    measurementId: "G-H1J4Q0T1QB"
    }
);

export const Context = createContext(null);

const auth = firebase.auth();
const firestore = firebase.firestore();

ReactDOM.render(
  <Context.Provider value={{
      firebase,
      auth,
      firestore
  }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);