const { response, request } = require('express');
const express = require('express');
const router = express.Router();
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');



router.get("/getTask", (request, response) => {
    
    try {
        const taskRecords = JSON.parse(localStorage.getItem("taskRecords"));
        const tasks = [];
        for (var i = 0; i < taskRecords.length; i++) {
            var taskContent = taskRecords[i].Task;
            var contentID =  taskRecords[i].ID;
            tasks.push({contentTask: taskContent, contentID: contentID});
        };
        response.status(200).json({
            message: "All Goods",
            tasks: tasks,
        });
    } catch {
        response.status(500).json({
            message: "Failed T_T"
        })
    }
});

router.post("/submitTask", (request, response) => {
    try {
        var myArr = JSON.parse(localStorage.getItem("taskRecords")) || [];
        myArr.push(request.body);
        localStorage.setItem("taskRecords", JSON.stringify(myArr));
        response.status(200).json({
            message: "All Goods",
        });
    } catch {
        response.status(500).json({
            message: "Failed T_T"
        })
    }
});

router.put("/editTask/:id", (request, response) => {
    try {
        const id = request.params.id;                                           /* get ID from request URL */
        const updatedData = request.body;                                       /* get updated data from request body */
        let taskRecords = JSON.parse(localStorage.getItem("taskRecords"));      /* get taskRecords from local storage */
        const index = taskRecords.findIndex(task => task.ID === parseInt(id));  /* find the index of the task with matching ID */
        if (index !== -1) {                                                     /* if task with matching ID is found */
            taskRecords[index] = {                                              /* update the task with new data */
                ...taskRecords[index],                                          /* copy existing properties */
                ...updatedData                                                  /* update with new properties */
            };
            localStorage.setItem("taskRecords", JSON.stringify(taskRecords));   /* save updated task records in local storage */
            response.status(200).json({
                message: `Task with ID ${id} was updated`,
                task: taskRecords[index]
            });
        } else {
            response.status(404).json({
                message: `Task with ID ${id} not found`,
            });
        }
    } catch {
        response.status(500).json({
            message: "Failed to update task"
        })
    }
});


router.delete("/deleteTask/:id", (request, response) => {
    try {
        const id = request.params.id;                                           /* get ID from request URL */
        let taskRecords = JSON.parse(localStorage.getItem("taskRecords"));      /* get taskRecords from local storage */
        taskRecords = taskRecords.filter(task => task.ID !== parseInt(id));     /* remove task with matching ID */
        localStorage.setItem("taskRecords", JSON.stringify(taskRecords));
        response.status(200).json({
            message: "All Goods",
        });
    } catch {
        response.status(500).json({
            message: "Failed T_T"
        })
    }
});



module.exports = router;