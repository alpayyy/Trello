package com.example.trello.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {
    @GetMapping("/some-endpoint")
    public ResponseEntity<String> someEndpoint() {
        return ResponseEntity.ok("Hello, World!");
    }
}
