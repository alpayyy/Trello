package com.example.trello.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class TaskList {
 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;
 private String name;

 @ManyToOne
 @JoinColumn(name = "user_id")
 @JsonBackReference
 private User user;


 public Long getId() { return id; }
 public void setId(Long id) { this.id = id; }

 public String getName() { return name; }
 public void setName(String name) { this.name = name; }

 public User getUser() { return user; }
 public void setUser(User user) { this.user = user; }
}
