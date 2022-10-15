//using IIFE concept
(function () {

    //array of todo tasks
    var tasks = [];
    let tmpTotalTasks = 0;
    var taskText;

    //fetching all the required dOM object
    var taskName = document.getElementById('task');
    var tasksList = document.getElementById('lists-container');
    var tasksLeft = document.getElementById('task-left');
    var notodo = document.getElementById('notask');
    var all = document.getElementById('all');
    var uncomplete = document.getElementById('uncomplete');
    var completed = document.getElementById('completed');
    var totTask = document.getElementById('total-tasks');

    /* func to add todo item to array */
    function addToDo() {
        /* empty task name check */
        if (!taskText) {
            showAlertNotification('Task name cannot be empty');
            return;
        }
        /* creating a task object*/
        const task = {
            title: taskText,
            id: Date.now(),
            completed: false
        }
        taskName.value = '';
        tasks.push(task);
        /* changing filter styles*/
        all.style.fontWeight = '700';
        uncomplete.style.fontWeight = '100';
        completed.style.fontWeight = '100';
        renderList();
    }

    // func to render list
    function renderList(e) {
        tasksList.innerHTML = '';
        for (let t of tasks) {
            addToDom(t);
        }
        // no todo item display validation
        if (tasks.length == 0) {
            notodo.style.display = 'block';
        }
        else {
            notodo.style.display = 'none';
        }
        // for keeping pending task value fixed while selecting completed task filter
        let tasksCompleted = tasks.filter(x => x.completed == true).length;
        if (e && e.target.id == 'completed') {
            tasksLeft.innerHTML = tmpTotalTasks;
        }
        else {
            tmpTotalTasks = tasks.length - tasksCompleted;
            tasksLeft.innerHTML = tasks.length - tasksCompleted;
        }
        
        if(tmpTotalTasks > 0){
           totTask.style.color = 'red';
        }
        else{
            totTask.style.color = 'blue';
        }
        return;
    }

    //creating li DOM for todo
    function addToDom(task) {
        var li = document.createElement('li');
        li.innerHTML = `
        <div ${task.completed? 'class="checked-list-item list-item"' :'class="unchecked-list-item list-item"'} >
            <div class='list-details'>
                <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox"/>
                <div class='task-name'><label for="${task.id}" class='title'>${task.title}</label></div>
            </div>
            <div class='list-delete'>
                <i class="fa fa-plus delete-icon onhover" data-id="${task.id}"></i>
            </div>
        </div>`;
        li.classList.add('todo_list_item');
        tasksList.append(li);
        return;
    }

    //deleting todo task
    function deleteTask(taskId) {
        var filteredTasks = tasks.filter(x => x.id != Number(taskId));
        tasks = filteredTasks;
        renderList();
        alert('Task deleted successfully');
        return;
    }

    //toggling complete status
    function toggleTask(taskId) {
        var completedTask = tasks.filter(x => x.id == Number(taskId));
        if (completedTask.length > 0) {
            const currentTask = completedTask[0];
            currentTask.completed = !currentTask.completed;
            renderList();
            if(currentTask.completed){
                showAlertNotification('Task checked successfully');
            }
            else{
                showAlertNotification('Task unchecked successfully');
            }
            return;
        }
    }
    //for marking all task as complete
    function markAsComplete() {
        var notCompletedTasksList = tasks.filter(x => x.completed === false);
        for (let t of notCompletedTasksList) {
            t.completed = true;
        }
        renderList();
    }
    //function to handling click and calling specific functions
    function handleClickListener(event) {
        const target = event.target;
        if (target.className === 'fa fa-plus delete-icon onhover') {
            const taskId = target.dataset.id;  //getting the data-id from img tag with dataset.id(data-id)
            deleteTask(taskId);
            return;
        }
        if (target.className === 'custom-checkbox') {
            const taskId = target.id;
            toggleTask(taskId);
            return;
        }
        else if (target.id === 'add') {
            taskText = taskName.value;
            addToDo();
            return;
        }
        else if (target.id === 'completeall') {
            if(tasks.length == 0){
                showAlertNotification('No tasks available.');
                return;
            }
            markAsComplete();
            showAlertNotification('All tasks marked completed succesfully.')
        }
        else if (target.id === 'all') {
            renderList();
            completed.style.fontWeight = '100';
            all.style.fontWeight = '700';
            uncomplete.style.fontWeight = '100';
            return;
        }
        else if (target.id === 'uncomplete') {
            let allTasks = tasks;
            let uncompleteTasks = tasks.filter(x => x.completed == false);
            tasks = uncompleteTasks;
            renderList();
            uncomplete.style.fontWeight = '700';
            completed.style.fontWeight = '100';
            all.style.fontWeight = '100';
            tasks = allTasks;
            return;
        }
        else if (target.id === 'completed') {
            let allTasks = tasks;
            let completeTasks = tasks.filter(x => x.completed == true);
            tasks = completeTasks;
            renderList(event);
            completed.style.fontWeight = '700';
            all.style.fontWeight = '100';
            uncomplete.style.fontWeight = '100';
            tasks = allTasks;
            return;
        }
        else if (target.id === 'clearcompleted') {
            if(tasks.length == 0){
                showAlertNotification('No tasks available.');
                return;
            }
            let notCompletedTasks = tasks.filter(x => x.completed === false);
            tasks = notCompletedTasks;
            renderList();
            showAlertNotification('All completed tasks deleted successfully.')
            return;
        }

    }
    function handleKeyPress(event){
        if (event.key === 'Enter') {
            event.preventDefault();
            taskText = event.target.value;
            addToDo();
            return;
        }
    }
    // to show alert message
    function showAlertNotification(text) {
        alert(text);
    }

    function initializeApp() {
        document.addEventListener('click', handleClickListener);
        document.addEventListener('keypress',handleKeyPress);
    }

    initializeApp();
})();