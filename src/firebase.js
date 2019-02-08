import * as firebase from "firebase";

import { FirebaseConfig } from "./config/keys.js";
firebase.initializeApp(FirebaseConfig);

/*const databaseRef = firebase.database().ref();
export const todosFbRef = databaseRef.child("baymax-ai-5bfac");*/

export const auth = firebase.auth();
/*export const todosFbRef = firebase.database().ref();*/
/*export const usersRef = firebase.database().ref("/users/");
export const listsRef = firebase.database().ref("/lists/");
export const itemsRef = firebase.database().ref("/items/");*/
export const db = firebase.database();
