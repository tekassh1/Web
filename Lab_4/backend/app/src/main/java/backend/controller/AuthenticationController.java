package backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/auth")
public class AuthenticationController {
    @PostMapping
    public String processAuth() {
        return "nice!";
    }

    @GetMapping
    public String processGetAuth() {
        return "get nice!";
    }
}