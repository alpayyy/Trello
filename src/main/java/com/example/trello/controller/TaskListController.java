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
        return ResponseEntity.ok(taskListService.save(taskList));
    }

    @GetMapping
    @Operation(summary = "Tüm görev listelerini al", description = "Tüm görev listelerinin listesini alır")
    public ResponseEntity<List<TaskList>> getAllTaskLists() {
        return ResponseEntity.ok(taskListService.findAll());
    }

    @PutMapping("/{id}")
    @Operation(summary = "Görev listesini güncelle", description = "Belirtilen ID'ye sahip görev listesini günceller")
    public ResponseEntity<TaskList> updateTaskList(@PathVariable Long id, @RequestBody TaskList taskList) {
        TaskList updatedTaskList = taskListService.update(id, taskList);
        if (updatedTaskList != null) {
            return ResponseEntity.ok(updatedTaskList);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Görev listesini sil", description = "Belirtilen ID'ye sahip görev listesini siler")
    public ResponseEntity<Void> deleteTaskList(@PathVariable Long id) {
        try {
            if (taskListService.delete(id)) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // Log the exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
