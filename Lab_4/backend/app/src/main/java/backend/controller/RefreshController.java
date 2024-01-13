package backend.controller;

import backend.exceptions.security.TokenValidationException;
import backend.model.http.AuthResponse;
import backend.model.http.RefreshRequest;
import backend.services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/refresh")
public class RefreshController {

    private AuthenticationService authenticationService;

    public RefreshController(@Autowired AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping
    public ResponseEntity<AuthResponse> refresh(@RequestBody RefreshRequest request) {
        try {
            AuthResponse response = authenticationService.refreshTokens(request);
            System.out.println("Token refreshed!");
            return ResponseEntity.ok(response);
        }
        catch (TokenValidationException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage(), e);
        }
    }
}
