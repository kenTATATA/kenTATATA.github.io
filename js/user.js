// import {Task} from "./task.js"  // これが上手くいかない..
// import {Task} from "/Users/NEC-PCuser/AutoCalendar-prototype2/AutoCalendar-prototype2/js/task.js"
class User{
    /**
     * @param {String} name :ユーザー名
     * @param {Schedule} lifestyle :定例スケジュール
     * @param {Schedule} schedule :スケジュール
     * @param {Settings} settings :設定
     */
    constructor(name, lifestyle, schedule, settings) {
        this.name = name;
        this.lifestyle = lifestyle;
        this.schedule = schedule;
        this.settings = settings;
    }
}

class Task {
    /**
     * @param {Number} id :Taskのid
     * @param {String} name :Task名
     * @param {Date} deadline :Taskの締め切り
     * @param {Number} required_time :Taskの所要時間(時間)
     * @param {Boolean} auto_scheduled :自動スケジューリングするか
     * @param {Boolean} duplicate :Taskの重複を許すか
     * @param {Boolean} all_day :Taskが終日かどうか
     * @param {Number} days :何日間
     * @param {String} overview :概要
     * @param {Stirng} category :カテゴリー
     * @param {Boolean} favorite :お気に入り
     */
    constructor(id, name, deadline, required_time, auto_scheduled, duplicate, all_day, days, overview, category, favorite) {
        this.id = id;
        this.name = name;
        this.deadline = deadline.getTime();
        this.required_time = required_time*3600000;
        this.auto_scheduled = auto_scheduled;
        this.duplicate = duplicate;
        this.all_day = all_day;
        this.days = days;
        this.overview = overview;
        this.category = category;
        this.favorite = favorite;
        var now = new Date();
        this.specified_time = [now.getTime(), now.getTime() + this.required_time];  // start, endの時刻をECMAScript元期からの経過ミリ数で表す
    }

    get getId() {
        return this.id;
    }

    get getName() {
        return this.name;
    }

    get getDeadline() {
        return this.deadline;
    }

    get getRequiredTime() {
        return this.required_time;
    }

    get isAutoScheduled() {
        return this.auto_scheduling;
    }

    get isDuplicate() {
        return this.duplicate;
    }

    get isAllDay() {
        return this.all_day;
    }

    get getDays() {
        return this.days;
    }

    get getOverview() {
        return this.overview;
    }

    get getCategory() {
        return this.category;
    }
    
    get isFavorite() {
        return this.favorite;
    }

    get getStartTime() {
        return this.specified_time[0];
    }

    get getEndTime() {
        return this.specified_time[1];
    }

    /**
     * @param {Number} id
     */
    set setId(id) {
        this.id = id;
    }
    
    /**
     * @param {String} name
     */
    set setName(name) {
        this.name = name;
    }

    /**
     * @param {Number} deadline
     */
    set setDeadline(deadline) {
        this.deadline = deadline;
    }

    /**
     * @param {Number} time
     */
    set setRequiredTime(time) {
        this.required_time = time;
    }

    /**
     * @param {Boolean} auto_scheduled
     */
    set setAutoScheduled(auto_scheduled) {
        this.auto_scheduled = auto_scheduled;
    }

    /**
     * @param {Boolean} duplicate
     */
    set setDuplicated(duplicate) {
        this.duplicate = duplicate;
    }

    /**
     * @param {Boolean} all_day
     */
    set setAllDay(all_day) {
        this.all_day = all_day;
    }

    /**
     * @param {Number} days
     */
    set setDays(days) {
        this.days = days;
    }

    /**
     * @param {String} overview
     */
    set setOverview(overview) {
        this.overview = overview;
    }

    /**
     * @param {String} category
     */
    set setCategory(category) {
        this.category = category;
    }

    /**
     * @param {Boolean} favorite
     */
    set setFavorite(favorite) {
        this.favorite = favorite;
    }

    /**
     *  @param {Number} start
     */
    set setStartTime(start) {
        this.specified_time[0] = start;
    }

    /**
     *  @param {Number} end
     */
    set setEndTime(end) {
        this.specified_time[1] = end;
    }

    /**
     * @param {Number} start
     */
    set setSpecifiedTime(start) {
        this.setStartTime(start);
        this.setEndTime(start + this.required_time);
    }
}

class Schedule{
    constructor(){
        this.time_series_tasks = []; // 時系列なTask
        this.other_tasks = []; // 終日、重複を許すTask
        this.all_tasks = [];
    }

    // タスクをスケジュールに追加するモジュール
    /**
     * @param {Task} task 
     */
    addTask(task) {
        // タスクの終了時刻が締め切り時刻を過ぎている場合には, エラー
        console.log("終了時刻 = " + task.specified_time[1]);
        console.log("締め切り時刻 = " + task.deadline);
        if (task.specified_time[1] > task.deadline) {
            console.log("締め切り過ぎたよ！！！");
        }
        this.time_series_tasks.push(task);
        
        //締め切り順でソート
        this.time_series_tasks.sort(function (a, b) {
            if (a.deadline != b.deadline) {
                return a.deadline - b.deadline;
            }
            else {
                return a.time - b.time;
            }
        });
        
        // 指定時間の変更
        for(var i=1; i < this.time_series_tasks.length;i++) {
            task.specified_time[0] = this.time_series_tasks[i-1].specified_time[1];
            task.specified_time[1] = task.specified_time[0]+task.required_time;
        }
    }

    // タスクをスケジュールから削除するモジュール
    /**
     * @param {Task} task
     */
    removeTask(task) {
        var id = task.id;
        var tasks;
        if(task.isAllDay || task.isDuplicate) {
            tasks = this.other_tasks;
        } else {
            tasks = this.time_series_tasks;
        }
        for(var i=0; i < this.tasks.length;i++) {
            if(this.tasks[i].getId == id) {
                this.tasks.splice(i,1);
            }
        }
    }

    // 時系列タスクの表示をするモジュール
    viewTasks() {
        for (const events of this.time_series_tasks) {
            console.log(events);
        }
    }
}

class Settings{
    constructor() {

    }
}

var myLifestyle = new Schedule();
var mySchedule = new Schedule();
var mySettings = new Settings();

var user1 = new User("山田太郎", myLifestyle, mySchedule, mySettings);
// constructor(id, name, deadline, time, auto_scheduled, duplicate, all_day, days, overview, category, favorite)
var task1 = new Task(123, "デザイン開発", new Date(2022, 12, 10, 18, 0), 10, true, false, false, 5, "Webページのデザインを開発せねば〜", "課題", true); // 3
var task2 = new Task(101, "情報線形代数レポート課題", new Date(2022, 12, 10, 19, 0), 1, true, false, false, 1, "早く早く終わりたい！！", "課題", true); // 4
var task3 = new Task(100, "デザイン課題", new Date(2022, 12, 9, 18, 0), 3, true, false, false, 1, "デザインの授業の課題", "課題", false); // 1
var task4 = new Task(142, "情報英語発展", new Date(2022, 12, 10, 18, 30), 3, true, false, false, 1, "英語で書かれた情報の専門誌を和訳する", "課題", false); // 2

console.log((new Date()).getTime());

user1.schedule.addTask(task1);
user1.schedule.addTask(task2);
user1.schedule.addTask(task3);
user1.schedule.addTask(task4);

user1.schedule.viewTasks();