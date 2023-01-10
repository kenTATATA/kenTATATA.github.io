import { all_tasks } from "./get_tasks.js";
import { Task } from "../js/class_Task.js";
import { User } from "../js/class_User.js";
import { Schedule } from "../js/class_Schedule.js";
import { Settings } from "../js/class_Settings.js";
import { timestampToDisplay } from "../js/common.js";

//(KIM)ユーザー情報を取得
//////////////////////////////////////////////////////////////////////
//(仮)ローカルにユーザー情報を作成
var mySchedule = new Schedule([], [], []);
var user = new User(null, null, null, null, mySchedule, null);
//////////////////////////////////////////////////////////////////////

//未完了タスクの一覧表示
//Taskの配列から表示
document.getElementById("task_list_container").innerHTML = "";
//実施日順にソート
all_tasks.sort(function (a, b) {
  return a.task_children[0].specified_time[0] > b.task_children[0].specified_time[0] ? 1 : -1;
});
for (const task of all_tasks) {
  if (task.valid == true) {
    var task_container = document.createElement("div");
    task_container.setAttribute("id", task.id.toString());
    task_container.classList.add("task_container");
    task_container.innerHTML = `
        <h5>${task.name}</h5>
            `;
    if (task.favorite == true) {
      task_container.innerHTML += `
    <img class="star" src="../img/star.png" />
                      `;
    }

    let number_of_child = 0;
    for (const child of task.task_children) {
      ++number_of_child;
      let time_0 = timestampToDisplay(child.specified_time[0]);
      let time_1 = timestampToDisplay(child.specified_time[1]);

      task_container.innerHTML += `
      <p>実施日${number_of_child}：${time_0}~${time_1}</p>
            `;
    }
    if (task.deadline != null) {
      let time_d = timestampToDisplay(task.deadline);
      task_container.innerHTML += `
       <p>締切日：${time_d}</p>
       `;
    }

    document.getElementById("task_list_container").appendChild(task_container);
  }

}
//詳細ボタンがクリックされたときに、セッションにそのタスクidを保存してから、detail.htmlへ移動
for (const task of all_tasks) {
  if (task.valid == true) {
    document
      .getElementById(task.id.toString())
      .addEventListener("click", function () {
        window.sessionStorage.setItem(["selected_task_id"], [task.id.toString()]);
        window.location.href = "../constructor/detail.html";
      });
  }
}
