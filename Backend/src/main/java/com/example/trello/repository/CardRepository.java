package com.example.trello.repository;

import com.example.trello.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CardRepository extends JpaRepository<Card, Long> {

    @Query("SELECT c FROM Card c WHERE c.user.id = :userId")
    List<Card> findByUserId(@Param("userId") Long userId);
}
