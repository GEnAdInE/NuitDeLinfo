import {
  doc, query, collection, getDocs, getFirestore, getDoc, updateDoc, deleteDoc, addDoc,
} from 'firebase/firestore';
import firebase from 'firebase/compat';
import Timestamp = firebase.firestore.Timestamp;

interface Article{
  Description: string,
  Sauveteurs: string,
  Titre: string,
}

interface Pending{
  Description: string,
  Sauveteurs: string,
  Titre: string,
  ID: string,
  IsNewArticle: boolean,
  Date: Timestamp,
}

const db = getFirestore();
async function getAllPending() {
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

async function getAllArticle() {
  const q = query(collection(db, 'Articles'));
  const querySnapshot = await getDocs(q);
  const myList: Article[] = [];
  // eslint-disable-next-line no-shadow
  querySnapshot.forEach((doc) => {
    const myArticle : Article = {
      Description: doc.data().Description,
      Sauveteurs: doc.data().Sauveteurs,
      Titre: doc.data().Titre,
    };
    myList.push(myArticle);
  });
  return myList;
}

async function getArticle(id: string) {
  const docRef = doc(db, 'Articles', id);
  const docSnap = await getDoc(docRef);
  if (docSnap?.exists()) {
    const article : Article = {
      Description: docSnap.data().Description,
      Sauveteurs: docSnap.data().Sauveteurs,
      Titre: docSnap.data().Titre,
    };
  } else {
    console.log('No such document!');
  }
}

async function getPending(id: string) {
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

async function updateArticle(id:string, newArticle:Article) {
  const docRef = doc(db, 'Articles', id);
  await updateDoc(docRef, {
    Description: newArticle.Description,
    Titre: newArticle.Titre,
    Sauveteurs: newArticle.Sauveteurs,
  });
}

async function deleteArticle(id:string) {
  await deleteDoc(doc(db, 'Articles', id));
}

async function deletePending(id:string) {
  await deleteDoc(doc(db, 'Pending', id));
}

async function addArticle(nArticle:Article) {
  const docRef = await addDoc(collection(db, 'Articles'), {
    Description: nArticle.Description,
    Titre: nArticle.Titre,
    Sauveteurs: nArticle.Sauveteurs,
  });
  console.log('Document written with ID: ', docRef.id);
  return docRef.id;
}

async function addPending(nPending:Pending) {
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

export { getAllPending, getPending };
