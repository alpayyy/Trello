package com.example.trello.service;

import com.example.trello.model.Card;
import com.example.trello.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardService {
    @Autowired

    private CardRepository cardRepository;
    public List<Card> getAllCards() {
        return cardRepository.findAll();
    }

    public Card saveCard(Card card){
        return cardRepository.save(card);
    }
    public void  deleteCard(Long id){
        cardRepository.deleteById(id);
    }
    public List<Card> getCardsByTitle(String title){
        return cardRepository.findByTitle(title);
    }


}
