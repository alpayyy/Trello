package com.example.trello.service;

import com.example.trello.model.TaskList;
import com.example.trello.repository.CardRepository;
import com.example.trello.repository.TaskListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskListService {

    @Autowired
    private TaskListRepository taskListRepository;

    @Autowired
    private CardRepository cardRepository;

    public TaskList save(TaskList taskList) {
        return taskListRepository.save(taskList);
    }

    public List<TaskList> findAll() {
        return taskListRepository.findAll();
    }

    public TaskList update(Long id, TaskList taskList) {
        if (taskListRepository.existsById(id)) {
            taskList.setId(id);
            return taskListRepository.save(taskList);
        } else {
            return null;
        }
    }

    public void deleteTaskList(Long taskListId) {
        // İlk olarak, task_list ile ilişkili tüm card kayıtlarını sil
        cardRepository.deleteByTaskListId(taskListId);
        // Daha sonra task_list'i sil
        taskListRepository.deleteById(taskListId);
    }
}
