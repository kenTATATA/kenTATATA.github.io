import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
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

const firebaseConfig = {
  apiKey: "AIzaSyAtUFSGnjJcRdC4Y8dL8pDJFO1ZeHOeRyc",
  authDomain: "auto-a42ab.firebaseapp.com",
  projectId: "auto-a42ab",
  storageBucket: "auto-a42ab.appspot.com",
  messagingSenderId: "819879919631",
  appId: "1:819879919631:web:511870f4f26e97c767637a",
  measurementId: "G-YZLN75JLBX",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// const querySnapshot = await getDocs(collection(db, "userData"));
// querySnapshot.forEach((doc) => {
//   console.log(doc.id, " => ", doc.data());
// });
//ここのtestuidのところにuserのuidを入れる

const userRef = doc(db, "userData", "testuid_getData");
const docsnap = await getDoc(userRef);
const data = docsnap.data().testtask1;

// const test_add_btn = document.getElementById("test_add");

// document.getElementById("time").innerHTML = docsnap.data().予定;
// document.getElementById("schedule").innerHTML = docsnap.data().時間;

export const task1 = new Task(
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
console.log(task1);

// test_add_btn.addEventListener("click", () => {
//   setDoc(doc(db, "userData", "testuid13412451"), {
//     testtask: [
//       data[0],
//       data[1],
//       data[2],
//       data[3],
//       data[4],
//       data[5],
//       data[6],
//       data[7],
//       data[8].seconds * 1000,
//       data[9],
//       data[10],
//       data[11],
//       data[12].seconds * 1000,
//       data[13].seconds * 1000,
//     ],
//   });
// });

//(KIM)ユーザー情報を取得
//////////////////////////////////////////////////////////////////////
//(仮)ローカルにユーザー情報を作成
var myLifestyle = new Schedule([], [], []);
var mySchedule = new Schedule([], [], []);
var mySettings = new Settings();
var user = new User("山田太郎", myLifestyle, mySchedule, mySettings);
//////////////////////////////////////////////////////////////////////

//main関数
//ページ更新時に実行
window.onload = function () {
  //(KIM)データベースからすべてのタスクを取得し、配列にする。
  //////////////////////////////////////////////////////////////////////
  //(仮)ローカルに最初から入っているタスクを作成し、配列にする。
  var task1 = new Task(
    123,
    "デザイン開発",
    "課題",
    "Webページのデザインを開発せねば〜",
    false,
    false,
    false,
    false,
    new Date(2022, 11, 14, 18, 20).getTime(),
    3,
    1,
    true,
    [[0, 0]]
  );
  var task2 = new Task(
    101,
    "情報線形代数レポート課題",
    "課題",
    "早く早く終わりたい！！",
    false,
    false,
    false,
    false,
    new Date(2022, 11, 14, 19, 0).getTime(),
    1,
    1,
    true,
    [[0, 0]]
  );
  var task3 = new Task(
    100,
    "デザイン課題",
    "課題",
    "デザインの授業の課題！！！！！！！",
    false,
    false,
    false,
    false,
    new Date(2023, 11, 14, 18, 0).getTime(),
    null,
    1,
    false,
    [
      [
        new Date(2022, 11, 14, 5, 25).getTime(),
        new Date(2022, 11, 14, 6, 0).getTime(),
      ],
    ]
  );
  var task4 = new Task(
    142,
    "情報英語発展",
    "課題",
    "英語で書かれた情報の専門誌を和訳する",
    false,
    false,
    false,
    false,
    new Date(2022, 11, 14, 18, 30).getTime(),
    3,
    1,
    true,
    [[0, 0]]
  );
  var task5 = new Task(
    182,
    "ドイツ語基礎",
    "課題",
    "ドイツ語で会話をしてみよう",
    false,
    false,
    false,
    false,
    new Date(2022, 11, 14, 18, 30).getTime(),
    3,
    1,
    true,
    [[0, 0]]
  );
  var all_tasks = [task1, task2, task3, task4, task5];
  //////////////////////////////////////////////////////////////////////

  //未完了タスクを表示
  task_list(all_tasks);
};

//未完了タスクの一覧表示
//Taskの配列から表示
function task_list(tasks) {
  document.getElementById("task_list_container").innerHTML = "";
  var i = 0;
  for (const task of tasks) {
    i++;
    var task_container = document.createElement("div");
    task_container.setAttribute("name", "task_" + String(i));
    task_container.innerHTML = `
        <a href="#">${task.name}</a>
            `;
    for (const time of task.specified_time) {
      task_container.innerHTML += `
        <p>${time[0]} -> ${time[1]}</p>
            `;
    }

    document.getElementById("task_list_container").appendChild(task_container);
  }
}
