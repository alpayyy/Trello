package com.example.trello.controller;

import com.example.trello.model.Task;
import com.example.trello.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tasks")
@Tag(name = "tasks", description = "Görev API'si")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/card/{cardId}")
    @Operation(summary = "Görev oluştur ve karta ata", description = "Belirtilen karta yeni bir görev oluşturur ve atar")
    public ResponseEntity<TaskResponse> createTaskForCard(@PathVariable Long cardId, @RequestBody Task task) {
        if (task.getTitle() == null || task.getDescription() == null) {
            return ResponseEntity.badRequest().build();
        }
        Task savedTask = taskService.assignTaskToCard(cardId, task);
        return ResponseEntity.ok(new TaskResponse(savedTask));
    }

    @GetMapping
    @Operation(summary = "Tüm görevleri al", description = "Tüm görevlerin listesini alır")
    public ResponseEntity<List<TaskResponse>> getAllTasks() {
        List<Task> tasks = taskService.findAll();
        List<TaskResponse> taskResponses = tasks.stream()
                .map(TaskResponse::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(taskResponses);
    }

    @GetMapping("/{id}")
    @Operation(summary = "ID ile görev al", description = "Belirtilen ID'ye sahip görevi alır")
    public ResponseEntity<TaskResponse> getTaskById(@PathVariable Long id) {
        Optional<Task> task = taskService.findById(id);
        return task.map(value -> ResponseEntity.ok(new TaskResponse(value)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @Operation(summary = "Görevi güncelle", description = "Belirtilen ID'ye sahip görevi günceller")
    public ResponseEntity<TaskResponse> updateTask(@PathVariable Long id, @RequestBody Task task) {
        Optional<Task> existingTask = taskService.findById(id);
        if (existingTask.isPresent()) {
            Task updatedTask = existingTask.get();
            updatedTask.setTitle(task.getTitle());
            updatedTask.setDescription(task.getDescription());
            updatedTask.setCompleted(task.isCompleted());
            Task savedTask = taskService.save(updatedTask);
            return ResponseEntity.ok(new TaskResponse(savedTask));
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

    // TaskResponse iç sınıfı veya ayrı bir dosya olarak
    public static class TaskResponse {
        private Long id;
        private String title;
        private String description;
        private boolean completed;
        private Long cardId;

        public TaskResponse(Task task) {
            this.id = task.getId();
            this.title = task.getTitle();
            this.description = task.getDescription();
            this.completed = task.isCompleted();
            this.cardId = task.getCard().getId();
        }

        // Getters
        public Long getId() { return id; }
        public String getTitle() { return title; }
        public String getDescription() { return description; }
        public boolean isCompleted() { return completed; }
        public Long getCardId() { return cardId; }
    }
}
