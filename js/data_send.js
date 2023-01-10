import { app } from "./firebase_config.js";
import { all_tasks } from "./get_tasks.js";
import { uuidv4 } from "./create_uuid.js";

import {
  collection,
  getDocs,
  getDoc,
  getDocFromCache,
  setDoc,
  doc,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const user_id = localStorage.getItem("uid");
const db = getFirestore(app);
const userRef = doc(db, "userData", user_id);
const docsnap = await getDoc(userRef);

const test_add_btn = document.getElementById("test_add");

// let e = all_tasks[0];

// document.getElementById("time").innerHTML = docsnap.data().予定;
// document.getElementById("schedule").innerHTML = docs nap.data().時間;

export function firebase_send(AllTask) {
  let docData = {};
  AllTask.forEach((e) => {
    console.log(AllTask);
    docData[e.id] = [
      e.id,
      e.name,
      e.category,
      e.overview,
      e.favorite,
      e.plan_or_task,
      e.finished,
      e.duplicate,
      e.deadline,
      e.required_time,
      e.days,
      e.auto_scheduled,
      e.unit_time,
      e.repeat_unit,
      e.importance,
      e.place,
      e.color,
      e.valid,
    ];
    e.task_children.forEach((e) => {
      docData[e.id].push(e.specified_time[0]);
      docData[e.id].push(e.specified_time[1]);
    });
    setDoc(doc(db, "userData", user_id), docData);
    console.log(e);
  });
}
