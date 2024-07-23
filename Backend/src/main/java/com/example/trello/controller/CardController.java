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

    @PostMapping
    @Operation(summary = "Kart oluştur", description = "Yeni bir kart oluşturur")
    public ResponseEntity<Card> createCard(@RequestBody Card card) {
        System.out.println("Received Card: " + card);
        try {
            Card createdCard = cardService.save(card);
            System.out.println("Created Card: " + createdCard);
            return ResponseEntity.ok(createdCard);
        } catch (Exception e) {
            System.err.println("Error creating card: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    @Operation(summary = "Tüm kartları al", description = "Tüm kartların listesini alır")
    public ResponseEntity<List<Card>> getAllCards() {
        return ResponseEntity.ok(cardService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "ID ile kart al", description = "Belirtilen ID'ye sahip kartı alır")
    public ResponseEntity<Card> getCardById(@PathVariable Long id) {
        System.out.println("Fetching card with ID: " + id);
        Optional<Card> card = cardService.findById(id);
        if (card.isPresent()) {
            System.out.println("Found card: " + card.get());
            return ResponseEntity.ok(card.get());
        } else {
            System.out.println("Card with ID " + id + " not found.");
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    @Operation(summary = "Kartı güncelle", description = "Belirtilen ID'ye sahip kartı günceller")
    public ResponseEntity<Card> updateCard(@PathVariable Long id, @RequestBody Card card) {
        System.out.println("Updating card with ID: " + id);
        Optional<Card> existingCard = cardService.findById(id);
        if (existingCard.isPresent()) {
            card.setId(id);
            Card updatedCard = cardService.save(card);
            System.out.println("Updated Card: " + updatedCard);
            return ResponseEntity.ok(updatedCard);
        } else {
            System.out.println("Card with ID " + id + " not found for update.");
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Kartı sil", description = "Belirtilen ID'ye sahip kartı siler")
    public ResponseEntity<Void> deleteCard(@PathVariable Long id) {
        System.out.println("Deleting card with ID: " + id);
        Optional<Card> card = cardService.findById(id);
        if (card.isPresent()) {
            cardService.deleteById(id);
            System.out.println("Deleted card with ID: " + id);
            return ResponseEntity.noContent().build();
        } else {
            System.out.println("Card with ID " + id + " not found for deletion.");
            return ResponseEntity.notFound().build();
        }
    }
}
