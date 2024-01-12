package backend.controller;

import backend.exceptions.auth.UserNotExistsException;
import backend.exceptions.auth.UsernameExistsException;
import backend.exceptions.auth.WrongCredsException;
import backend.exceptions.auth.WrongCredsFormatException;
import backend.model.http.AuthRequest;
import backend.model.http.AuthResponse;
import backend.services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private AuthenticationService authService;

    public AuthenticationController(@Autowired AuthenticationService authService) {
        this.authService = authService;
    }

    @PostMapping
    public ResponseEntity<AuthResponse> processAuth(
            @RequestBody AuthRequest authRequest,
            @RequestHeader("accessToken") String accessToken) {

        if (authRequest.getAuthType().equals("login")) {
            try {
                AuthResponse response = authService.login(authRequest);
                return ResponseEntity.ok(response);
            }
            catch (UserNotExistsException | WrongCredsException e) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage(), e);
            }
        }
        else if (authRequest.getAuthType().equals("signup")) {
            try {
                AuthResponse response = authService.signup(authRequest);
                System.out.println("Method signup finished!");
                return ResponseEntity.ok(response);
            }
            catch (UsernameExistsException | WrongCredsFormatException e) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage(), e);
            }
        }
        return ResponseEntity.badRequest()
                    .body(new AuthResponse("bado requesto, Amigo", null, null));
    }

    @GetMapping
    public void wtf() {

    }
}