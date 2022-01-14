// Import the functions you need from the SDKs you need
//docs to intergrate firebase: https://firebase.google.com/docs/database/web/start 
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXcsb7jL2cW_Yc7Gjt06oH0gIZQTF_t_w",
  authDomain: "expensify-f1026.firebaseapp.com",
  databaseURL: "https://expensify-f1026-default-rtdb.firebaseio.com",
  projectId: "expensify-f1026",
  storageBucket: "expensify-f1026.appspot.com",
  messagingSenderId: "963229870001",
  appId: "1:963229870001:web:8425a33be1a92758b1bf90",
  measurementId: "G-1TCBKVNZ4Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// firebase.initializeApp(firebaseConfig);
// firebase.database().ref().set({
// 	name: 'Ilan Lieberman'
// });

// Get a reference to the database service 
//docs for read, write, update, delete from database: https://firebase.google.com/docs/database/web/read-and-write
//docs how to create multiple datasets: https://firebase.google.com/docs/database/usage/sharding 

function writeUserData(userId, name, email, age, isSingle, city, country) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email,
    age,
    isSingle,
    location: {
      city,
      country
    }
  });
}

writeUserData('23542354234', 'Ilan', 'ilanlieberman@hotmail.com', 28, true, 'Hong Kong', 'Hong Hong SAR'); // this is how you write data to firebase
writeUserData('23542354235', 'bob', 'bobjs@hotmail.com', 27, false, 'New York', 'USA');