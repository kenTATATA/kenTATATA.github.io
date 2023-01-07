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
    if (e.auto_scheduled == false) {
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
      ];
      for (let i = 0; i < e.specified_time.length; i++) {
        docData[e.id].push(e.specified_time[i][0]);
        docData[e.id].push(e.specified_time[i][1]);
      }
    } else {
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
        new Date(e.specified_time[0]),
        new Date(e.specified_time[1]),
      ];
      for (let i = 0; i < e.specified_time.length; i + 2) {
        docData[e.id].push(e.specified_time[i]);
        docData[e.id].push(e.specified_time[i++]);
      }
    }
    setDoc(doc(db, "userData", user_id), docData);
    console.log(e);
  });
}

test_add_btn.addEventListener(
  "click",
  function () {
    firebase_send(all_tasks);
  }

  // console.log("hi")
  // function () {
  // let docData = {};
  // all_tasks.forEach((e) => {
  //   console.log(all_tasks);
  //   const dataId = uuidv4();
  //   (docData[dataId] = [
  //     e.id,
  //     e.name,
  //     e.category,
  //     e.overview,
  //     e.favorite,
  //     e.plan_or_task,
  //     e.finished,
  //     e.duplicate,
  //     e.deadline,
  //     e.required_time,
  //     e.days,
  //     e.auto_scheduled,
  //     e.specified_time[0][0],
  //     e.specified_time[0][1],
  //   ]),
  //     setDoc(doc(db, "userData", user_id), docData);
  //   console.log(e);
  // });
  // }
);
