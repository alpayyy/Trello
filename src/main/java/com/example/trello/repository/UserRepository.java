package com.example.trello.repository;

import com.example.trello.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
 User findByUsername(String username);
}
