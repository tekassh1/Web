package backend.services;

import backend.model.http.AuthRequest;
import backend.repository.UsersRepository;
import backend.security.JWTProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthenticationService {

    private UsersRepository usersRepository;
    private JWTProvider jwtProvider;
    private Map<String, String> refreshStorage = new HashMap<>();

    public AuthenticationService(@Autowired UsersRepository usersRepository,
                                 @Autowired JWTProvider jwtProvider) {
        this.usersRepository = usersRepository;
        this.jwtProvider = jwtProvider;
    }

    public String login(AuthRequest authRequest) {

    }

    public String signup(AuthRequest authRequest) {

    }
}
