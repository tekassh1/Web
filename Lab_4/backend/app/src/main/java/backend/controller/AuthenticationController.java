package backend.controller;

import backend.model.http.AuthResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @PostMapping
    public String processAuth() {
        return "nice!";
    }

    @GetMapping
    public ResponseEntity<AuthResponse> processGetAuth() {
        return ResponseEntity.ok(new AuthResponse("auth successful", "ksjhkjsf"));
    }
}