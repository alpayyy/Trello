package com.example.trello.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.trello.model.TaskList;

public interface TaskListRepository extends JpaRepository<TaskList, Long> {}
