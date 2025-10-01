import { db, auth } from "./firebase.js";
import { addDoc, getDocs, collection } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

export {
  db,
  auth,
  addDoc,
  getDocs,
  collection,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
};


