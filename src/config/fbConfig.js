import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyBiL56i5vvA7InpsOT-HO8Y96fz5mTfii8",
    authDomain: "mario-plan-644ae.firebaseapp.com",
    databaseURL: "https://mario-plan-644ae.firebaseio.com",
    projectId: "mario-plan-644ae",
    storageBucket: "",
    messagingSenderId: "692554079883",
    appId: "1:692554079883:web:e8b2b31b10eb672b"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;