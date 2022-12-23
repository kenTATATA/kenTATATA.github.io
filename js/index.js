import { all_tasks } from "./get_tasks.js";

import { Schedule } from "./class_Schedule.js";
import { Settings } from "./class_Settings.js";
import { User } from "./class_User.js";

let myLifestyle = new Schedule([], [], []);
let mySchedule = new Schedule([], [], []);
let mySettings = new Settings();
let user = new User("山田太郎", myLifestyle, mySchedule, mySettings);
//////////////////////////////////////////////////////////////////////

//main関数
//ページ更新時に実行

// window.onload = function () {
//(KIM)データベースからすべてのタスクを取得し、配列にする。
//////////////////////////////////////////////////////////////////////

//未完了タスクを表示
task_list(all_tasks);
// };

//未完了タスクの一覧表示
//Taskの配列から表示
function task_list(tasks) {
  document.getElementById("task_list_container").innerHTML = "";
  let i = 0;
  for (const task of tasks) {
    i++;
    let task_container = document.createElement("div");
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
