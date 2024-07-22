package com.example.trello.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.trello.model.TaskList;
import com.example.trello.repository.TaskListRepository;
import java.util.List;

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
}
