import { Task } from "../js/class_Task.js";
import { User } from "../js/class_User.js";
import { Schedule } from "../js/class_Schedule.js";
import { Settings } from "../js/class_Settings.js";
import { all_tasks } from "./get_tasks.js";

//(KIM)ユーザー情報を取得
//////////////////////////////////////////////////////////////////////
//(仮)ローカルにユーザー情報を作成
var myLifestyle = new Schedule([], [], []);
var mySchedule = new Schedule([], [], []);
var mySettings = new Settings();
var user = new User("山田太郎", myLifestyle, mySchedule, mySettings);
//////////////////////////////////////////////////////////////////////

//(KIM)データベースから他のタスクを取得し、Taskクラスの変換してScheduleクラスに格納
//////////////////////////////////////////////////////////////////////
//(仮)ローカルに最初から入っているタスクを作成しScheduleクラスに格納
// var task1 = new Task(123, "デザイン開発", "課題", "Webページのデザインを開発せねば〜", false, false, false, false, (new Date(2022, 11, 14, 18, 20)).getTime(), 3, 1, true, [[0, 0]]);
// var task2 = new Task(101, "情報線形代数レポート課題", "課題", "早く早く終わりたい！！", false, false, false, false, (new Date(2022, 11, 14, 19, 0)).getTime(), 1, 1, true, [[0, 0]]);
// var task3 = new Task(100, "デザイン課題", "課題", "デザインの授業の課題！！！！！！！", false, false, false, false, (new Date(2023, 11, 14, 18, 0)).getTime(), null, 1, false, [[(new Date(2022, 11, 14, 5, 25)).getTime(), (new Date(2022, 11, 14, 6, 0)).getTime()]]);
// var task4 = new Task(142, "情報英語発展", "課題", "英語で書かれた情報の専門誌を和訳する", false, false, false, false, (new Date(2022, 11, 14, 18, 30)).getTime(), 3, 1, true, [[0, 0]]);
// var task5 = new Task(182, "ドイツ語基礎", "課題", "ドイツ語で会話をしてみよう", false, false, false, false, (new Date(2022, 11, 14, 18, 30)).getTime(), 3, 1, true, [[0, 0]]);
// var all_tasks = [task1, task2, task3, task4, task5];
//////////////////////////////////////////////////////////////////////

//選択されたタスクの情報を取得
var selected_task_id = window.sessionStorage.getItem(["selected_task_id"]);
var selected_task = "";
for (const task of all_tasks) {
  if (task.id == selected_task_id) {
    var selected_task = task;
  }
}

//選択されたタスクを取得
var detail_container = document.getElementById("detail_container")
if (selected_task) {
  detail_container.innerHTML = `
    <div class="add_task__item">
    <p>タスク名</p>
    ${selected_task.name}
    </div>
    <div class="add_task__item">
    <p>締切日</p>
    ${selected_task.deadline}
    </div>
    <div class="add_task__item">
    <p>推定予定時間</p>
    ${selected_task.required_time}
    </div>
    <div class="add_task__item">
    <p>実施予定日</p>
    ${selected_task.duplicate}
    ${selected_task.days}
    ${selected_task.specified_time}
    </div>
    <div class="add_task__item">
    <p>概要</p>
    ${selected_task.overview}
    </div>

    <div class="add_task__item">
    <p>カテゴリ</p>
    ${selected_task.category}
    </div>

    <div class="add_task__item">
    <p>お気に入り</p>
    ${selected_task.favorite}
    </div>
            `;
} else {
  detail_container.innerHTML = `
    予期せぬエラーが発生しました。
            `;
}
