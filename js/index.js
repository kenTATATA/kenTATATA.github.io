import { all_tasks } from "./get_tasks.js";
import { Task } from "../js/class_Task.js";
import { User } from "../js/class_User.js";
import { Schedule } from "../js/class_Schedule.js";
import { Settings } from "../js/class_Settings.js";

//(KIM)ユーザー情報を取得
//////////////////////////////////////////////////////////////////////
//(仮)ローカルにユーザー情報を作成
var myLifestyle = new Schedule([], [], []);
var mySchedule = new Schedule([], [], []);
var mySettings = new Settings();
var user = new User("山田太郎", myLifestyle, mySchedule, mySettings);
//////////////////////////////////////////////////////////////////////

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
// var all_tasks = [task1, task2, task3, task4, task5];
//////////////////////////////////////////////////////////////////////

//未完了タスクの一覧表示
//Taskの配列から表示
document.getElementById("task_list_container").innerHTML = "";
var i = 0;
for (const task of all_tasks) {
  i++;
  var task_container = document.createElement("div");
  task_container.setAttribute("name", "task_" + String(i));
  task_container.innerHTML = `
        <h5>${task.name}</h5>
            `;
  for (const time of task.specified_time) {
    task_container.innerHTML += `
        ${time[0]} -> ${time[1]}<br>
            `;
  }
  task_container.innerHTML += `
        <button type="button" id="${task.id}">詳細</button>
            `;

  document.getElementById("task_list_container").appendChild(task_container);
}
//詳細ボタンがクリックされたときに、セッションにそのタスクidを保存してから、detail.htmlへ移動
for (const task of all_tasks) {
  document
    .getElementById(task.id.toString())
    .addEventListener("click", function () {
      window.sessionStorage.setItem(["selected_task_id"], [task.id.toString()]);
      window.location.href = "../constructor/detail.html";
    });
}
