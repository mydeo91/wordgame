import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";

firebase.initializeApp(firebaseConfig);

// export db ref
export const db = firebase.firestore();
export const userRef = db.collection("users");
export const boardRef = db.collection("boards");
export const gameRef = db.collection("games");

export { firebase };
