package com.example.trello.service;

import com.example.trello.model.Card;
import com.example.trello.model.User;
import com.example.trello.repository.CardRepository;
import com.example.trello.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CardService {

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private UserRepository userRepository;

    public Card save(Card card) {
        return cardRepository.save(card);
    }
    
    public List<Card> findByUserId(Long userId) {
        return cardRepository.findByUserId(userId);
    }

    public List<Card> findAll() {
        return cardRepository.findAll();
    }

    public Optional<Card> findById(Long id) {
        return cardRepository.findById(id);
    }

    public void deleteById(Long id) {
        cardRepository.deleteById(id);
    }

    public Card createCardForUser(Long userId, Card card) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            card.setUser(user);
            user.setCard(card);
            return cardRepository.save(card);
        }
        return null;
    }
}
