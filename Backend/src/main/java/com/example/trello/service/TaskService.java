package com.example.trello.service;

import com.example.trello.model.Card;
import com.example.trello.model.Task;
import com.example.trello.repository.TaskRepository;
import com.example.trello.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private CardRepository cardRepository;

    public Task save(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    public Optional<Task> findById(Long id) {
        return taskRepository.findById(id);
    }

    public void deleteById(Long id) {
        taskRepository.deleteById(id);
    }

    public Task updateTaskCard(Long taskId, Long newCardId) {
        Optional<Task> taskOptional = taskRepository.findById(taskId);
        Optional<Card> cardOptional = cardRepository.findById(newCardId);

        if (taskOptional.isPresent() && cardOptional.isPresent()) {
            Task task = taskOptional.get();
            Card newCard = cardOptional.get();
            task.setCard(newCard);
            return taskRepository.save(task);
        } else {
            if (!taskOptional.isPresent()) {
                System.out.println("Task not found with ID: " + taskId);
            }
            if (!cardOptional.isPresent()) {
                System.out.println("Card not found with ID: " + newCardId);
            }
            return null;
        }
    }

    public void updateTaskOrdersAfterRemoval(Card card, Task removedTask) {
    List<Task> tasks = card.getTasks().stream()
        .filter(t -> !t.getId().equals(removedTask.getId()))
        .sorted(Comparator.comparingInt(Task::getTaskOrder))
        .collect(Collectors.toList());
    for (int i = 0; i < tasks.size(); i++) {
        tasks.get(i).setTaskOrder(i);
        taskRepository.save(tasks.get(i));
    }
}

public void updateTaskOrdersAfterInsertion(Card card, Task insertedTask, int newOrder) {
    List<Task> tasks = card.getTasks().stream()
        .filter(t -> !t.getId().equals(insertedTask.getId()))
        .sorted(Comparator.comparingInt(Task::getTaskOrder))
        .collect(Collectors.toList());

    for (int i = tasks.size(); i > newOrder; i--) {
        tasks.get(i - 1).setTaskOrder(i);
        taskRepository.save(tasks.get(i - 1));
    }
}
public Task assignTaskToCard(Long cardId, Task task) {
    Optional<Card> cardOpt = cardRepository.findById(cardId);
    if (cardOpt.isPresent()) {
        Card card = cardOpt.get();
        task.setCard(card);

        int maxOrder = card.getTasks().stream()
            .mapToInt(Task::getTaskOrder)
            .max()
            .orElse(-1);
        task.setTaskOrder(maxOrder + 1);

        return taskRepository.save(task);
    }
    return null;
}
}
