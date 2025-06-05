let task = [];

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text) {
        task.push({ text: text, completed: false});
        taskInput.value = "";
        updateTasklist();
    }
};

const toggleTaskComplete = (index) => {
    task[index].completed = !task[index].completed;
    console.log({ task });
};

const updateTasklist = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    task.forEach((task, index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? 'completed':''}">
                    <input type="checkbox" class="checkbox" ${
                        task.completed ? 'checked' : ""
                    }/>
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="edit.png" onClick="editTask(${index})" />
                    <img src="bin.png" onClick="deleteTask(${index})" />
                </div>
            </div>
        `;
        listItem.addEventListener('change', () => toggleTaskComplete(index));
        taskList.appendChild(listItem);
    });
};

document.getElementById("newTask").addEventListener("click", function (e){
    e.preventDefault();
    addTask();
});

// function editTask(index) { ... }
// function deleteTask(index) { ... }
// function toggleTaskComplete(index) { ... }
