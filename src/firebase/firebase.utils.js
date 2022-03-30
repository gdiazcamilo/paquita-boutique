import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-sLfv2pw69_Brl7i5sFl36xtkk_zNmTU",
  authDomain: "paquita-boutique.firebaseapp.com",
  projectId: "paquita-boutique",
  storageBucket: "paquita-boutique.appspot.com",
  messagingSenderId: "923208346866",
  appId: "1:923208346866:web:58ba544a8fe05a6bd3b46b",
  measurementId: "G-2ME5N0NN3T",
};

export const app = initializeApp(firebaseConfig);
export const authorizer = getAuth();
export const firestore = getFirestore();

const googleProvider = new GoogleAuthProvider();

export const signInWithGooglePopUp = () =>
  signInWithPopup(authorizer, googleProvider);

export const saveUser = async (userAuth, additionalData) => {
  if (!userAuth) {
    return null;
  }

  const userRef = doc(firestore, "users", userAuth.uid);
  const userInDb = await getDoc(userRef);

  if (userInDb.exists()) {
    return userRef;
  }

  const { displayName, email } = userAuth;
  const createdAt = new Date();
  try {
    await setDoc(userRef, {
      displayName,
      email,
      createdAt,
      ...additionalData,
    });

    return userRef;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const convertCollectionsSnapshotToObject = (collectionsSnapshot) => {
  const collectionsList = collectionsSnapshot.docs.map((collection) => {
    const { title, imageUrl, items, size } = collection.data();
    console.log(title);
    return {
      id: collection.id,
      title: title,
      items: items,
      linkUrl: `/shop/${encodeURI(title.toLowerCase())}`,
      imageUrl: imageUrl,
      size: size,
    };
  });

  return collectionsList.reduce((accumulator, currentCollection) => {
    accumulator[currentCollection.title.toLowerCase()] = currentCollection;
    return accumulator;
  }, {});
};

const getUser = async () => {
  const specificUserQuery = doc(firestore, "users", "Icj0gbfklh61wa3ARgmb");
  console.log(specificUserQuery);
  const user = await getDoc(specificUserQuery);
  console.log(user);
  console.log(user.data());

  const allUsersQuery = collection(firestore, "users");
  const allUsers = await getDocs(allUsersQuery);
  allUsers.forEach((u) => console.log(u.data()));

  const specificCartItemQuery = doc(
    firestore,
    "users/Icj0gbfklh61wa3ARgmb/cartItems/16bvKwgsB72ZY7Fe9OP2"
  );
  const cartItem = await getDoc(specificCartItemQuery);
  console.log(cartItem.data());
};
