let tasks = [];

        const addTask = () => {
            const taskInput = document.getElementById("taskInput");
            const text = taskInput.value.trim();

            if (text) {
                tasks.push({ 
                    id: Date.now(), // Add unique ID
                    text: text, 
                    completed: false
                });
                taskInput.value = "";
                updateTaskList();
                updateStats();
            }
        };

        const toggleTaskComplete = (id) => {
            const taskIndex = tasks.findIndex(task => task.id === id);
            if (taskIndex !== -1) {
                tasks[taskIndex].completed = !tasks[taskIndex].completed;
                updateTaskList();
                updateStats();
            }
        };

        const deleteTask = (id) => {
            tasks = tasks.filter(task => task.id !== id);
            updateTaskList();
            updateStats();
        };

        const editTask = (id) => {
            const taskIndex = tasks.findIndex(task => task.id === id);
            if (taskIndex !== -1) {
                const currentText = tasks[taskIndex].text;
                const newText = prompt("Edit task:", currentText);
                
                if (newText !== null && newText.trim() !== "") {
                    tasks[taskIndex].text = newText.trim();
                    updateTaskList();
                }
            }
        };

        const updateTaskList = () => {
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = '';

            if (tasks.length === 0) {
                taskList.innerHTML = '<div class="empty-state">No tasks yet. Add one above!</div>';
                return;
            }

            tasks.forEach((task) => {
                const listItem = document.createElement('li');

                listItem.innerHTML = `
                    <div class="taskItem">
                        <div class="task ${task.completed ? 'completed' : ''}">
                            <input type="checkbox" class="checkbox" ${
                                task.completed ? 'checked' : ""
                            } onchange="toggleTaskComplete(${task.id})"/>
                            <p>${task.text}</p>
                        </div>
                        <div class="icons">
                            <button class="icon-btn edit-btn" onclick="editTask(${task.id})" title="Edit task">✏️</button>
                            <button class="icon-btn delete-btn" onclick="deleteTask(${task.id})" title="Delete task">🗑️</button>
                        </div>
                    </div>
                `;
                
                taskList.appendChild(listItem);
            });
        };

        const updateStats = () => {
            const completedTasks = tasks.filter(task => task.completed).length;
            const totalTasks = tasks.length;
            
            // Update numbers
            const numbersElement = document.getElementById("numbers");
            numbersElement.textContent = `${completedTasks} / ${totalTasks}`;
            
            // Update progress bar
            const progressElement = document.getElementById("progress");
            const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
            progressElement.style.width = `${progressPercentage}%`;
        };

        // Event listeners
        document.getElementById("taskForm").addEventListener("submit", function (e) {
            e.preventDefault();
            addTask();
        });

        document.getElementById("taskInput").addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                addTask();
            }
        });

        // Initialize the app
        updateTaskList();
        updateStats();

        // Make functions globally available
        window.toggleTaskComplete = toggleTaskComplete;
        window.deleteTask = deleteTask;
        window.editTask = editTask;
