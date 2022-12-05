import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword as signInWithEmailAndPasswordDb,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore";
import { firebaseConfig } from "./firebase.conf.mjs";

export const app = initializeApp(firebaseConfig);
export const authorizer = getAuth();
export const firestore = getFirestore();

export const signInWithEmailAndPassword = (email, password) =>
  signInWithEmailAndPasswordDb(authorizer, email, password);

const googleProvider = new GoogleAuthProvider();
export const signInWithGooglePopUp = () =>
  signInWithPopup(authorizer, googleProvider);

export const checkUserIsAuthenticated = () => {
  return new Promise((resolve, reject) => {
    const unsubscribeFromAuthChanged = authorizer.onAuthStateChanged(
      (userAuth) => {
        unsubscribeFromAuthChanged();
        resolve(userAuth);
      },
      reject
    );
  });
};

export const signOut = () => authorizer.signOut();

export const fetchCartFromDb = async (userId) => {
  if (!userId) {
    return [];
  }

  const userRef = doc(firestore, "users", userId);
  const user = await getDoc(userRef);
  if (!user.exists()) {
    return [];
  }

  return user.data().cartItems || [];
};

export const updateCartInDb = async (userId, cartItems) => {
  if (!userId) {
    return;
  }

  const userRef = doc(firestore, "users", userId);
  const userInDb = await getDoc(userRef);
  await setDoc(userRef, { ...userInDb.data(), cartItems });
};

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

export const createUser = (email, password) =>
  createUserWithEmailAndPassword(authorizer, email, password);

export const convertCollectionsSnapshotToObject = (collectionsSnapshot) => {
  const collectionsList = collectionsSnapshot.docs.map((collection) => {
    const { title, imageUrl, items, size } = collection.data();
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

// const getUser = async () => {
//   const specificUserQuery = doc(firestore, "users", "Icj0gbfklh61wa3ARgmb");
//   console.log(specificUserQuery);
//   const user = await getDoc(specificUserQuery);
//   console.log(user);
//   console.log(user.data());

//   const allUsersQuery = collection(firestore, "users");
//   const allUsers = await getDocs(allUsersQuery);
//   allUsers.forEach((u) => console.log(u.data()));

//   const specificCartItemQuery = doc(
//     firestore,
//     "users/Icj0gbfklh61wa3ARgmb/cartItems/16bvKwgsB72ZY7Fe9OP2"
//   );
//   const cartItem = await getDoc(specificCartItemQuery);
//   console.log(cartItem.data());
// };
