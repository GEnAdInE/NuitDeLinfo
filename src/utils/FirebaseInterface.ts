import {
  doc, query, collection, getDocs, getFirestore, getDoc, updateDoc, deleteDoc, addDoc, setDoc,
} from 'firebase/firestore';
import * as firebase from 'firebase/app';
import {
  getAuth, GoogleAuthProvider, TwitterAuthProvider, GithubAuthProvider, signInWithPopup,
  AuthProvider,
} from 'firebase/auth';

export interface Article{
  ID: string,
  Description: string,
  Sauveteurs: string,
  Titre: string,
}

export interface Pending{
  Description: string,
  Sauveteurs: string,
  Titre: string,
  ID: string,
  IsNewArticle: boolean,
  Date: Date,
}

export interface User{
  IsAdmin: boolean,
  Name: string,
}

// eslint-disable-next-line no-shadow
export enum LoginMode{
  Twitter = 0,
  Google=1,
  GitHub = 2,
  Basic = 3,
}

const firebaseConfig = {
  apiKey: 'AIzaSyAUgICpXRIYAmDY43GcRl2e0NoPkAqnK5Y',
  authDomain: 'snsm-e12d3.firebaseapp.com',
  projectId: 'snsm-e12d3',
  storageBucket: 'snsm-e12d3.appspot.com',
  messagingSenderId: '1098742023798',
  appId: '1:1098742023798:web:d78b2abd17af9a63f74157',
};

firebase.initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

const providerGoogle = new GoogleAuthProvider();
const providerTwitter = new TwitterAuthProvider();
const providerGit = new GithubAuthProvider();

export async function getAllPending() {
  const q = query(collection(db, 'Pending'));
  const querySnapshot = await getDocs(q);
  const myList: Pending[] = [];
  // eslint-disable-next-line no-shadow
  querySnapshot.forEach((doc) => {
    const myPending : Pending = {
      Description: doc.data().Description,
      Sauveteurs: doc.data().Sauveteurs,
      Titre: doc.data().Titre,
      ID: doc.data().ID,
      IsNewArticle: doc.data().IsNewArticle,
      Date: doc.data().Date,
    };
    myList.push(myPending);
  });
  return myList;
}

export async function getAllArticle() {
  const q = query(collection(db, 'Articles'));
  const querySnapshot = await getDocs(q);
  const myList: Article[] = [];
  // eslint-disable-next-line no-shadow
  querySnapshot.forEach((doc) => {
    const myArticle : Article = {
      ID: doc.id,
      Description: doc.data().Description,
      Sauveteurs: doc.data().Sauveteurs,
      Titre: doc.data().Titre,
    };
    myList.push(myArticle);
  });
  return myList;
}

export async function getArticle(id: string) {
  const docRef = doc(db, 'Articles', id);
  const docSnap = await getDoc(docRef);
  if (docSnap?.exists()) {
    const article : Article = {
      ID: id,
      Description: docSnap.data().Description,
      Sauveteurs: docSnap.data().Sauveteurs,
      Titre: docSnap.data().Titre,
    };
  } else {
    console.log('No such document!');
  }
}

export async function getPending(id: string) {
  const docRef = doc(db, 'Pending', id);
  const docSnap = await getDoc(docRef);
  if (docSnap?.exists()) {
    const pending : Pending = {
      Description: docSnap.data().Description,
      Sauveteurs: docSnap.data().Sauveteurs,
      Titre: docSnap.data().Titre,
      ID: docSnap.data().ID,
      IsNewArticle: docSnap.data().IsNewArticle,
      Date: docSnap.data().Date,
    };
    return pending;
  }
  console.log('No such document!');
  return null;
}

export async function updateArticle(id:string, newArticle:Article) {
  const docRef = doc(db, 'Articles', id);
  await updateDoc(docRef, {
    Description: newArticle.Description,
    Titre: newArticle.Titre,
    Sauveteurs: newArticle.Sauveteurs,
  });
}

export async function deleteArticle(id:string) {
  await deleteDoc(doc(db, 'Articles', id));
}

export async function deletePending(id:string) {
  await deleteDoc(doc(db, 'Pending', id));
}

export async function addArticle(nArticle:Article) {
  const docRef = await addDoc(collection(db, 'Articles'), {
    Description: nArticle.Description,
    Titre: nArticle.Titre,
    Sauveteurs: nArticle.Sauveteurs,
  });
  console.log('Document written with ID: ', docRef.id);
  return docRef.id;
}

export async function addPending(nPending:Pending) {
  const docRef = await addDoc(collection(db, 'Pending'), {
    Description: nPending.Description,
    Sauveteurs: nPending.Sauveteurs,
    Titre: nPending.Titre,
    ID: nPending.ID,
    IsNewArticle: nPending.IsNewArticle,
    Date: nPending.Date,
  });
  console.log('Document written with ID: ', docRef.id);
  return docRef.id;
}

export function IsUserLogin() {
  const { currentUser } = getAuth();
  return currentUser != null;
}

export async function IsUserAdmin() {
  if (IsUserLogin()) {
    const uid : string = <string>getAuth().currentUser?.uid;
    const docRef = doc(db, 'Users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap?.exists()) {
      const user: User = {
        IsAdmin: docSnap.data().IsAdmin,
        Name: docSnap.data().Name,
      };
      console.log(user.IsAdmin);
      return user.IsAdmin;
    }
  } else {
    return false;
  }
}

export async function OtherLogin(types : LoginMode) {
  let provider = new GoogleAuthProvider();
  switch (types) {
    case LoginMode.GitHub:
      provider = new GithubAuthProvider();
      break;
    case LoginMode.Google:
      provider = new GoogleAuthProvider();
      break;
    case LoginMode.Twitter:
      provider = new TwitterAuthProvider();
      break;
    default:
      return;
      break;
  }
  signInWithPopup(auth, provider).then(async (result) => {
    const { user } = result;
    console.log(user); // User that was authenticated
    const docRef = doc(db, 'Users', user.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap?.exists()) {
      await setDoc(doc(db, 'Users', user.uid), {
        Name: user.displayName,
        IsAdmin: false,
      });
    }
  })
    .catch((err) => {
      console.log(err); // This will give you all the information needed to further debug any errors
    });
}
