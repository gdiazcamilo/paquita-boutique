const SHOP_DATA = require("./shop.data");
const {
  getFirestore,
  writeBatch,
  doc,
  collection,
} = require("firebase/firestore");
const { initializeApp } = require("firebase/app");
import("./firebase.conf.mjs").then(
  (config) => {
    function loadCatalog() {
      const firebaseApp = initializeApp(config.firebaseConfig);
      const firestoreDb = getFirestore(firebaseApp);
      const batch = writeBatch(firestoreDb);

      for (const [_, collectionData] of Object.entries(SHOP_DATA)) {
        const newCatalogRef = doc(collection(firestoreDb, "collections"));
        batch.set(newCatalogRef, collectionData);
      }

      batch.commit().then(
        () => console.log("Import completed"),
        (error) => console.error(error)
      );
    }

    loadCatalog();
  },
  (error) => console.error(error)
);
