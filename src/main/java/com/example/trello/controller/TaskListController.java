package com.example.trello.controller;

import com.example.trello.model.Task;
import com.example.trello.model.TaskList;
import com.example.trello.service.TaskListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasklists")
public class TaskListController {

    @Autowired
    private TaskListService  taskListService;

    @GetMapping
    public List<TaskList> getAllTaskList(){
        return taskListService.getAllTaskLists();
    }
    @PostMapping
    public TaskList  createTaskList(@RequestBody TaskList taskList)
    {
        return  taskListService.saveTaskList(taskList);
    }
    @DeleteMapping
    public void deleteTaskList(@PathVariable Long id){
        taskListService.deleteTaskList(id);
    }

}
