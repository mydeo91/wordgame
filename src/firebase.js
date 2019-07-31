import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";

firebase.initializeApp(firebaseConfig);

// export db ref
const db = firebase.firestore();
export const userRef = db.collection("users");
export const gameRef = db.collection("games");

export default firebase;
