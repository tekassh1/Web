package backend.controller;

import backend.model.http.AuthRequest;
import backend.model.http.AuthResponse;
import backend.services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private AuthenticationService authService;

    public AuthenticationController(@Autowired AuthenticationService authService) {
        this.authService = authService;
    }

    @PostMapping
    public ResponseEntity<AuthResponse> processAuth(@RequestBody AuthRequest authRequest) {

        if (authRequest.getAuthType().equals("login")) {
            String token = authService.login(authRequest);
            AuthResponse response = new AuthResponse("You have logged in successfully!", token);
            return ResponseEntity.ok(response);
        }
        else if (authRequest.getAuthType().equals("signup")) {
            String token = authService.signup(authRequest);
            AuthResponse response = new AuthResponse("You have signed up in successfully!", token);
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.badRequest()
                    .body(new AuthResponse("bado requesto, Amigo", null));
    }
}