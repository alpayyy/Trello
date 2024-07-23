package com.example.trello.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.trello.model.Task;
import com.example.trello.service.TaskService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
@Tag(name = "tasks", description = "Görev API'si")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    @Operation(summary = "Görev oluştur", description = "Yeni bir görev oluşturur")
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        if (task.getTitle() == null || task.getDescription() == null) {
            return ResponseEntity.badRequest().build();
        }
        Task savedTask = taskService.save(task);
        return ResponseEntity.ok(savedTask);
    }

    @GetMapping
    @Operation(summary = "Tüm görevleri al", description = "Tüm görevlerin listesini alır")
    public ResponseEntity<List<Task>> getAllTasks() {
        return ResponseEntity.ok(taskService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "ID ile görev al", description = "Belirtilen ID'ye sahip görevi alır")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Optional<Task> task = taskService.findById(id);
        return task.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @Operation(summary = "Görevi güncelle", description = "Belirtilen ID'ye sahip görevi günceller")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task task) {
        Optional<Task> existingTask = taskService.findById(id);
        if (existingTask.isPresent()) {
            Task updatedTask = existingTask.get();
            updatedTask.setTitle(task.getTitle());
            updatedTask.setDescription(task.getDescription());
            updatedTask.setCompleted(task.isCompleted());
            return ResponseEntity.ok(taskService.save(updatedTask));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Görevi sil", description = "Belirtilen ID'ye sahip görevi siler")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        if (taskService.findById(id).isPresent()) {
            taskService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
