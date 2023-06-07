// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL, getBytes } from "firebase/storage";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where, setDoc, deleteDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export async function userExists(uid) {
  const docRef = doc(db, 'users', uid);
  const res = await getDoc(docRef);
  return res.exists();
}

export async function existsUsername(username){
  const users = [];
  const docsRef = collection(db, 'users')
  const q = query(docsRef, where('username', '==', username));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(doc => {
    users.push(doc.data())
  });
  console.log("Holaaa")
  return users.length > 0 ? users[0].uid : null;
}

export async function registerNewUser(user){
  try {
    const collectionRef = collection(db, 'users');
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, user);
  } catch (error) {console.log(error)}
}

export async function updateUser(user){
  try {
    const collectionRef = collection(db, 'users');
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, user);
  } catch (error) {console.log(error)}
}

export async function getUserInfo(uid){
  try {
    const docRef= doc(db, 'users', uid);
    const document = await getDoc(docRef);
    return document.data();
  } catch (error) {
    console.log(error)
  }
}

export async function insertNewProject(project){
  try {
    const collectionRef = collection(db, 'projects');
    const docRef = doc(collectionRef, project.id);
    await setDoc(docRef, project);
  } catch (error) {console.log(error)}
}

export async function getProjects(uid){
  console.log("llega"+uid)
  const projects = [];
  try {
    const collectionRef = collection(db, 'projects');
    const q = query(collectionRef, where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) =>{
      const project = {...doc.data()};
      project.docId=doc.id;
      projects.push(project)
    }); 
    return projects;

  } catch (error) {
    console.error(error);
  }
}

export async function getProject(id){
  try {
    console.log("Esteeeeeeeeeeeee "+ id)
    const docRef= doc(db, 'projects', id);
    const document = await getDoc(docRef);
    return document.data();
  } catch (error) {
    console.log(error)
  }
}

export async function updateProject(project){
  try {
    const collectionRef = collection(db, 'projects');
    const docRef = doc(collectionRef, project.id);
    await setDoc(docRef, project);
  } catch (error) {console.log(error)}
}


export  function logout() {
   auth.signOut();
}