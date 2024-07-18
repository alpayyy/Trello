package com.example.trello.service;

import com.example.trello.model.TaskList;
import com.example.trello.repository.TaskListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskListService {
    @Autowired
    private TaskListRepository taskListRepository;

    public List<TaskList> getAllTaskLists() {
        return taskListRepository.findAll();
    }

    public TaskList saveTaskList(TaskList taskList) {
        return taskListRepository.save(taskList);
    }

    public void deleteTaskList(Long id) {
        taskListRepository.deleteById(id);
    }
}
