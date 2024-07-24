package com.example.trello.controller;

import com.example.trello.model.Card;
import com.example.trello.service.CardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cards")
@Tag(name = "cards", description = "Kart API'si")
public class CardController {

    @Autowired
    private CardService cardService;

    @PostMapping("/user/{userId}")
    @Operation(summary = "Kart oluştur", description = "Belirtilen kullanıcı için yeni bir kart oluşturur")
    public ResponseEntity<Card> createCardForUser(@PathVariable Long userId, @RequestBody Card card) {
        try {
            Card createdCard = cardService.createCardForUser(userId, card);
            if (createdCard != null) {
                return ResponseEntity.ok(createdCard);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/user/{userId}")
    @Operation(summary = "Kullanıcıya ait kartları al", description = "Belirtilen kullanıcıya ait tüm kartların listesini alır")
    public ResponseEntity<List<Card>> getCardsByUserId(@PathVariable Long userId) {
        List<Card> cards = cardService.findByUserId(userId);
        return ResponseEntity.ok(cards);
    }

    @GetMapping
    @Operation(summary = "Tüm kartları al", description = "Tüm kartların listesini alır")
    public ResponseEntity<List<Card>> getAllCards() {
        return ResponseEntity.ok(cardService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "ID ile kart al", description = "Belirtilen ID'ye sahip kartı alır")
    public ResponseEntity<Card> getCardById(@PathVariable Long id) {
        Optional<Card> card = cardService.findById(id);
        return card.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @Operation(summary = "Kartı güncelle", description = "Belirtilen ID'ye sahip kartı günceller")
    public ResponseEntity<Card> updateCard(@PathVariable Long id, @RequestBody Card card) {
        Optional<Card> existingCard = cardService.findById(id);
        if (existingCard.isPresent()) {
            card.setId(id);
            Card updatedCard = cardService.save(card);
            return ResponseEntity.ok(updatedCard);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Kartı sil", description = "Belirtilen ID'ye sahip kartı siler")
    public ResponseEntity<Void> deleteCard(@PathVariable Long id) {
        Optional<Card> card = cardService.findById(id);
        if (card.isPresent()) {
            cardService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
