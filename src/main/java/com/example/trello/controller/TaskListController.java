package com.example.trello.controller;

import com.example.trello.model.TaskList;
import com.example.trello.service.TaskListService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasklists")
@Tag(name = "tasklists", description = "Görev Listesi API'si")
public class TaskListController {

    @Autowired
    private TaskListService taskListService;

    @PostMapping
    @Operation(summary = "Görev listesi oluştur", description = "Yeni bir görev listesi oluşturur")
    public ResponseEntity<TaskList> createTaskList(@RequestBody TaskList taskList) {
        if (taskList != null) {
            TaskList createdTaskList = taskListService.save(taskList);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdTaskList);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    @Operation(summary = "Tüm görev listelerini al", description = "Tüm görev listelerinin listesini alır")
    public ResponseEntity<List<TaskList>> getAllTaskLists() {
        List<TaskList> taskLists = taskListService.findAll();
        if (taskLists.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(taskLists);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Belirli bir görev listesini al", description = "Belirtilen ID'ye sahip görev listesini alır")
    public ResponseEntity<TaskList> getTaskListById(@PathVariable Long id) {
        TaskList taskList = taskListService.findById(id);
        if (taskList != null) {
            return ResponseEntity.ok(taskList);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    @Operation(summary = "Görev listesini güncelle", description = "Belirtilen ID'ye sahip görev listesini günceller")
    public ResponseEntity<TaskList> updateTaskList(@PathVariable Long id, @RequestBody TaskList taskList) {
        if (taskList != null && taskList.getId() != null) {
            if (!taskList.getId().equals(id)) {
                return ResponseEntity.badRequest().build();
            }
            TaskList updatedTaskList = taskListService.update(id, taskList);
            if (updatedTaskList != null) {
                return ResponseEntity.ok(updatedTaskList);
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Görev listesini sil", description = "Belirtilen ID'ye sahip görev listesini siler")
    public ResponseEntity<Void> deleteTaskList(@PathVariable Long id) {
        try {
            taskListService.deleteTaskList(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
