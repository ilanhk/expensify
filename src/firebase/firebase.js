// Import the functions you need from the SDKs you need
//docs to intergrate firebase: https://firebase.google.com/docs/database/web/start 
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, onValue, update, remove, off } from "firebase/database"; //set(), remove(), update() are promises so can you .then for successful result and .catch for failures/errors
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
// examples to watch for firebase 9 https://www.youtube.com/watch?v=BOITPwChVP4&ab_channel=TACV-TheAmazingCode-Verse

//write into dataset:
// use set() 
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
  }).then(()=>{
    console.log('Data is saved!');
  }).catch((e)=>{
    console.log('This failed!!:', e);
  });
};

writeUserData('23542354234', 'Ilan', 'ilanlieberman@hotmail.com', 28, true, 'Hong Kong', 'Hong Hong SAR'); // this is how you write data to firebase
writeUserData('23542354235', 'bob', 'bobjs@hotmail.com', 27, false, 'New York', 'USA');

//To read from data set:
// use onValue()
const db = getDatabase();
const userId = 23542354235;
const reference = ref(db, 'users/' + userId);
onValue(reference, (snapshot) => {
  const data = snapshot.val();
  console.log(data);
});

// off(reference); turns off subscrition to the reference


//to edit from a data set
// use update()

// const updates ={
//   isSingle: false,
//   age: null,
//   job: 'Software Developer',
//   'location/city': 'Chicago' // to update a nested attributes in this ex city need '' for attrubute location city attribute is in location attribute of the dataset
// };

// update(reference, updates).then((update)=>{
//   console.log('Update successful!: ', update)
// }).catch((e)=>{
//     console.log('Update unsuccessful!: ', e)
// }); // takes in the ref first then the object that needs updating 
//also you can add new attribute to the data set like 'job' from the ex or you can delete an existing attribute by setting the field to null like 'age: null'
//use this for set it would make the update the new dataset name , age etc would disappear



//to delete:
// remove(reference);

//to delete a key value pair from the dataset: ex removing isSingle property
// remove(ref(db,'users/' + userId +'/isSingle')
//   ).then(()=>{
//     console.log('Data was removed')
//   }).catch((e)=>{
//     console.log('Error in removing data: ', e)
//   });

//Another way to delete data is to use set() in set(ref, null) - the null will delete the data from whatever reference you give it
// set(ref(db,'users/' + userId +'/isSingle'), null
//   ).then(()=>{
//     console.log('Data was removed')
//   }).catch((e)=>{
//     console.log('Error in removing data: ', e)
//   });