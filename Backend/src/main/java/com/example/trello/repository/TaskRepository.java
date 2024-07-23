package com.example.trello.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.trello.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {}
