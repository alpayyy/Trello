package com.example.trello.service;

import com.example.trello.model.Card;
import com.example.trello.model.Task;
import com.example.trello.repository.TaskRepository;
import com.example.trello.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Task assignTaskToCard(Long cardId, Task task) {
        Optional<Card> cardOpt = cardRepository.findById(cardId);
        if (cardOpt.isPresent()) {
            Card card = cardOpt.get();
            task.setCard(card);
            return taskRepository.save(task);
        }
        return null;
    }
}
