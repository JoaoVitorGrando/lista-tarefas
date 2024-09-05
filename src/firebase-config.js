// src/firebase-config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDW76zNu7KiOe_QCgsHdZRVepEQl5D0LkU",
  authDomain: "tarefas-app-c1265.firebaseapp.com",
  projectId: "tarefas-app-c1265",
  storageBucket: "tarefas-app-c1265.appspot.com",
  messagingSenderId: "95127705718",
  appId: "1:95127705718:web:2590021dff59a1bfef6757"
};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const auth = getAuth(app);
