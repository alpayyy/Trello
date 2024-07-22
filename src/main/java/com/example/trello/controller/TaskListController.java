package com.example.trello.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.trello.model.TaskList;
import com.example.trello.service.TaskListService;
import java.util.List;

@RestController
@RequestMapping("/api/tasklists")
public class TaskListController {
    @Autowired
    private TaskListService taskListService;

    @PostMapping
    public ResponseEntity<TaskList> createTaskList(@RequestBody TaskList taskList) {
        return ResponseEntity.ok(taskListService.save(taskList));
    }

    @GetMapping
    public ResponseEntity<List<TaskList>> getAllTaskLists() {
        return ResponseEntity.ok(taskListService.findAll());
    }
}
