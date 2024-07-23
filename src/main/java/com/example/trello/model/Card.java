package com.example.trello.model;

import jakarta.persistence.*;

@Entity
public class Card {
 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;
 private String title;
 private String description;

 @ManyToOne
 @JoinColumn(name = "task_list_id")
 private TaskList taskList;

 // Varsayılan yapıcı
 public Card() {
 }

 // Getter ve Setter metodları
 public Long getId() {
  return id;
 }

 public void setId(Long id) {
  this.id = id;
 }

 public String getTitle() {
  return title;
 }

 public void setTitle(String title) {
  this.title = title;
 }

 public String getDescription() {
  return description;
 }

 public void setDescription(String description) {
  this.description = description;
 }

 public TaskList getTaskList() {
  return taskList;
 }

 public void setTaskList(TaskList taskList) {
  this.taskList = taskList;
 }
}
