import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyCdJ6RS-R689JZytWAF-uUXiWji3foxnw0",
  authDomain: "new-ig-project.firebaseapp.com",
  databaseURL: "https://new-ig-project.firebaseio.com",
  projectId: "new-ig-project",
  storageBucket: "new-ig-project.appspot.com",
  messagingSenderId: "224979759268",
  appId: "1:224979759268:web:95a2724d43308795f2f631",
  measurementId: "G-856WDM3DRS"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
export { storage, firebase as default };
