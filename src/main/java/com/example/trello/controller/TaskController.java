package com.example.trello.controller;


import com.example.trello.model.Task;
import com.example.trello.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public List<Task> getAllTasks(){
        return taskService.getAllTasks();
    }

    @PostMapping
    public Task createTask(@RequestBody Task task){
        return taskService.saveTask(task);
    }

    @DeleteMapping("/{id}")
    public  void deleteTask(@PathVariable Long id){
        taskService.deleteTask(id);
    }
}
