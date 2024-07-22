package com.example.trello.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.trello.model.TaskList;
import com.example.trello.repository.TaskListRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TaskListService {
    @Autowired
    private TaskListRepository taskListRepository;

    public TaskList save(TaskList taskList) {
        return taskListRepository.save(taskList);
    }

    public List<TaskList> findAll() {
        return taskListRepository.findAll();
    }

    public TaskList update(Long id, TaskList taskList) {
        Optional<TaskList> existingTaskList = taskListRepository.findById(id);
        if (existingTaskList.isPresent()) {
            TaskList taskListToUpdate = existingTaskList.get();
            taskListToUpdate.setName(taskList.getName()); // Update fields as needed
            // Add other fields to update here
            return taskListRepository.save(taskListToUpdate);
        } else {
            return null; // Or throw an exception
        }
    }

    public boolean delete(Long id) {
        if (taskListRepository.existsById(id)) {
            taskListRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
