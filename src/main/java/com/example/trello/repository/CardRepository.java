package com.example.trello.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.trello.model.Card;

public interface CardRepository extends JpaRepository<Card, Long> {
}
