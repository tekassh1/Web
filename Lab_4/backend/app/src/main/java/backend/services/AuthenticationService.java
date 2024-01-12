package backend.services;

import backend.exceptions.auth.UserNotExistsException;
import backend.exceptions.auth.UsernameExistsException;
import backend.exceptions.auth.WrongCredsException;
import backend.exceptions.auth.WrongCredsFormatException;
import backend.model.entities.User;
import backend.model.http.AuthRequest;
import backend.model.http.AuthResponse;
import backend.repository.UsersRepository;
import backend.security.HashProvider;
import backend.security.JWTProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

@Service
public class AuthenticationService {

    private UsersRepository usersRepository;
    private JWTProvider jwtProvider;
    private HashProvider hashProvider;

    private Map<String, String> refreshStorage = new HashMap<>(); // ???

    public AuthenticationService(@Autowired UsersRepository usersRepository,
                                 @Autowired JWTProvider jwtProvider,
                                 @Autowired HashProvider hashProvider) {
        this.usersRepository = usersRepository;
        this.jwtProvider = jwtProvider;
        this.hashProvider = hashProvider;
    }

    public AuthResponse login(AuthRequest authRequest) throws UserNotExistsException, WrongCredsException {

        if (!usersRepository.existsByUsername(authRequest.getUsername()))
            throw new UserNotExistsException("Username does not exist!");

        User storedUser = usersRepository.findByUsername(authRequest.getUsername());
        String hashedPass = hashProvider.hashPass(authRequest.getPassword() + storedUser.getSalt());

        if (!hashedPass.equals(storedUser.getPassword()))
            throw new WrongCredsException("Wrong password!");

        String accessToken = jwtProvider.generateAccessToken(storedUser);
        String refreshToken = jwtProvider.generateRefreshToken(storedUser);

        return new AuthResponse("Login successful", accessToken, refreshToken);
    }

    public AuthResponse signup(AuthRequest authRequest) throws UsernameExistsException, WrongCredsFormatException {

        if (usersRepository.existsByUsername(authRequest.getUsername()))
            throw new UsernameExistsException("This username is already exists!");

        validateUsername(authRequest.getUsername());
        validatePassword(authRequest.getPassword());

        String salt = hashProvider.generateSalt();
        String hashedPass = hashProvider.hashPass(authRequest.getPassword() + salt);

        User newUser = new User(authRequest.getUsername(), hashedPass, salt);
        usersRepository.save(newUser);

        String accessToken = jwtProvider.generateAccessToken(newUser);
        String refreshToken = jwtProvider.generateRefreshToken(newUser);

        return new AuthResponse("Signup successful", accessToken, refreshToken);
    }

    private void validateUsername(String username) throws WrongCredsFormatException {
        Pattern pattern = Pattern.compile("^[0-9A-Za-z_]{5,15}$");
        if (!pattern.matcher(username).matches())
            throw new WrongCredsFormatException("Username should contain only letters " +
                    "and numbers (5-15 symbols)");
    }

    private void validatePassword(String password) throws WrongCredsFormatException {
        Pattern pattern = Pattern.compile("^(?!.* )(?=.*?\\d)(?=.*?[a-zA-Z])[a-zA-Z\\d]+.{5,15}$");
        if (!pattern.matcher(password).matches())
            throw new WrongCredsFormatException("Password should contain at least one letter and digit " +
                    "(5-15 symbols, no spaces)");
    }
}