import { app } from "./firebase_config.js";
import {
  doc,
  collection,
  getDocs,
  setDoc,
  getDoc,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { Task } from "./task.js";
import { Schedule } from "./class_Schedule.js";
import { Settings } from "./class_Settings.js";
import { User } from "./class_User.js";

const db = getFirestore(app);

const userRef = doc(db, "userData", "testuid_getData");
const docsnap = await getDoc(userRef);
const data = docsnap.data().testtask1;

// console.log(docsnap.data()[Object.keys(docsnap.data())[1]]);
// console.log([Object.keys(docsnap.data())[1]]);

let all_tasks = [];

for (let i = 0; i < Object.keys(docsnap.data()).length; i++) {
  let data = docsnap.data()[Object.keys(docsnap.data())[i]];
  let task = new Task(
    data[0],
    data[1],
    data[2],
    data[3],
    data[4],
    data[5],
    data[6],
    data[7],
    data[8].seconds * 1000,
    data[9],
    data[10],
    data[11],
    [[data[12].seconds * 1000, data[13].seconds * 1000]]
  );
  all_tasks.push(task);
  console.log(docsnap.data()[Object.keys(docsnap.data())[i]]);
}
