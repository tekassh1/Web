package backend.services;

import backend.exceptions.auth.UserNotExistsException;
import backend.exceptions.auth.UsernameExistsException;
import backend.exceptions.auth.WrongCredsException;
import backend.exceptions.auth.WrongCredsFormatException;
import backend.exceptions.security.TokenValidationException;
import backend.model.entities.User;
import backend.model.http.AuthRequest;
import backend.model.http.AuthResponse;
import backend.model.http.RefreshRequest;
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

        String accessToken = jwtProvider.generateAccessToken(storedUser.getUsername());
        String refreshToken = jwtProvider.generateRefreshToken(storedUser.getUsername());

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

        String accessToken = jwtProvider.generateAccessToken(newUser.getUsername());
        String refreshToken = jwtProvider.generateRefreshToken(newUser.getUsername());

        return new AuthResponse("Signup successful", accessToken, refreshToken);
    }

    public AuthResponse refreshTokens(RefreshRequest request) throws TokenValidationException {
        if (jwtProvider.validateAccessToken(request.getUsername(), request.getAccessToken()) &&
                jwtProvider.validateRefreshToken(request.getUsername(), request.getRefreshToken())) {

            String newAccessToken = jwtProvider.generateAccessToken(request.getUsername());
            String newRefreshToken = jwtProvider.generateRefreshToken(request.getUsername());
            return new AuthResponse("Tokens was refreshed successfully!", newAccessToken, newRefreshToken);
        }
        else {
            throw new TokenValidationException("Tokens are invalid!");
        }
    }

    public void logout(AuthRequest request) {
        jwtProvider.removeRefreshToken(request.getUsername());
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