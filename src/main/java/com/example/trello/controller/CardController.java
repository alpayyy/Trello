package com.example.trello.controller;

import com.example.trello.model.Card;
import com.example.trello.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/cards")
public class CardController {
    @Autowired
    private CardService cardService;

    @GetMapping
    public List<Card> getAllCards(){
        return cardService.getAllCards();
    }
    @PostMapping
    public Card createCard(@RequestBody Card card){
        return cardService.saveCard(card);
    }
    @DeleteMapping("/{id}")
    public void deleteCard(@PathVariable Long id) {
        cardService.deleteCard(id);
    }
    @GetMapping("/title/{title}")
    public List<Card> getCardsByTitle(@PathVariable String title) {
        return cardService.getCardsByTitle(title);
    }

}
