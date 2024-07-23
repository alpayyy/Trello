package com.example.trello.controller;
import com.example.trello.dto.UserLoginDTO;
import com.example.trello.dto.UserDTO;
import com.example.trello.model.User;
import com.example.trello.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@Tag(name = "users", description = "Kullanıcı API'si")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    @Operation(summary = "Kullanıcı kaydet", description = "Yeni bir kullanıcı kaydeder")
    public ResponseEntity<UserDTO> registerUser(@RequestBody UserDTO userDTO) {
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setEmail(userDTO.getEmail());
        user.setName(userDTO.getName());
        user.setSurname(userDTO.getSurname());

        User savedUser = userService.save(user);
        UserDTO responseDTO = new UserDTO();
        responseDTO.setId(savedUser.getId());
        responseDTO.setUsername(savedUser.getUsername());
        responseDTO.setEmail(savedUser.getEmail());
        responseDTO.setName(savedUser.getName());
        responseDTO.setSurname(savedUser.getSurname());

        return ResponseEntity.ok(responseDTO);
    }

  @PostMapping("/login")
    @Operation(summary = "Kullanıcı giriş yap", description = "Kullanıcı giriş yapar")
    public ResponseEntity<User> loginUser(@RequestBody UserLoginDTO userLoginDTO) {
        User existingUser = userService.findByUsername(userLoginDTO.getUsername());
        if (existingUser != null && passwordEncoder.matches(userLoginDTO.getPassword(), existingUser.getPassword())) {
            return ResponseEntity.ok(existingUser);
        } else {
            return ResponseEntity.status(401).body(null);
        }
    }

    @GetMapping
    @Operation(summary = "Tüm kullanıcıları al", description = "Tüm kullanıcıların listesini alır")
    public ResponseEntity<Object> getAllUsers() {
        List<User> users = userService.findAll();
        List<UserDTO> userDTOs = users.stream().map(user -> {
            UserDTO userDTO = new UserDTO();
            userDTO.setId(user.getId());
            userDTO.setUsername(user.getUsername());
            userDTO.setEmail(user.getEmail());
            userDTO.setName(user.getName());
            userDTO.setSurname(user.getSurname());
            return userDTO;
        }).toList();

        return ResponseEntity.ok(userDTOs);
    }

    @GetMapping("/{id}")
    @Operation(summary = "ID ile kullanıcı al", description = "Belirtilen ID'ye sahip kullanıcıyı alır")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.findById(id);
        if (user.isPresent()) {
            UserDTO userDTO = new UserDTO();
            userDTO.setId(user.get().getId());
            userDTO.setUsername(user.get().getUsername());
            userDTO.setEmail(user.get().getEmail());
            userDTO.setName(user.get().getName());
            userDTO.setSurname(user.get().getSurname());
            return ResponseEntity.ok(userDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    @Operation(summary = "Kullanıcıyı güncelle", description = "Belirtilen ID'ye sahip kullanıcıyı günceller")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        Optional<User> existingUser = userService.findById(id);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setUsername(userDTO.getUsername());
            user.setEmail(userDTO.getEmail());
            user.setName(userDTO.getName());
            user.setSurname(userDTO.getSurname());
            if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(userDTO.getPassword())); // Şifreyi şifrele
            }
            User updatedUser = userService.save(user);
            UserDTO responseDTO = new UserDTO();
            responseDTO.setId(updatedUser.getId());
            responseDTO.setUsername(updatedUser.getUsername());
            responseDTO.setEmail(updatedUser.getEmail());
            responseDTO.setName(updatedUser.getName());
            responseDTO.setSurname(updatedUser.getSurname());
            return ResponseEntity.ok(responseDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Kullanıcıyı sil", description = "Belirtilen ID'ye sahip kullanıcıyı siler")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userService.findById(id).isPresent()) {
            userService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
