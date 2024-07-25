package com.example.trello.controller;
import com.example.trello.model.Card;
import com.example.trello.model.Task;
import com.example.trello.service.TaskService;
import com.example.trello.service.CardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
@Tag(name = "tasks", description = "Görev API'si")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private CardService cardService;

    // Diğer endpoint'ler...

    @PutMapping("/move")
    @Operation(summary = "Görevi taşı", description = "Bir görevi bir karttan başka bir karta taşır")
    public ResponseEntity<TaskResponse> moveTask(@RequestBody MoveTaskRequest moveTaskRequest) {
        Optional<Task> taskOpt = taskService.findById(moveTaskRequest.getTaskId());
        Optional<Card> sourceCardOpt = cardService.findById(moveTaskRequest.getSourceCardId());
        Optional<Card> destinationCardOpt = cardService.findById(moveTaskRequest.getDestinationCardId());

        if (taskOpt.isPresent() && sourceCardOpt.isPresent() && destinationCardOpt.isPresent()) {
            Task task = taskOpt.get();
            Card sourceCard = sourceCardOpt.get();
            Card destinationCard = destinationCardOpt.get();

            sourceCard.getTasks().remove(task);
            destinationCard.getTasks().add(task);
            task.setCard(destinationCard);

            cardService.save(sourceCard);
            cardService.save(destinationCard);
            Task savedTask = taskService.save(task);
            return ResponseEntity.ok(new TaskResponse(savedTask));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // MoveTaskRequest sınıfı veya iç sınıfı
    public static class MoveTaskRequest {
        private Long taskId;
        private Long sourceCardId;
        private Long destinationCardId;

        // Getters and setters
        public Long getTaskId() { return taskId; }
        public void setTaskId(Long taskId) { this.taskId = taskId; }

        public Long getSourceCardId() { return sourceCardId; }
        public void setSourceCardId(Long sourceCardId) { this.sourceCardId = sourceCardId; }

        public Long getDestinationCardId() { return destinationCardId; }
        public void setDestinationCardId(Long destinationCardId) { this.destinationCardId = destinationCardId; }
    }

    // TaskResponse iç sınıfı
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
