package backend.security;

import backend.model.entities.User;
import backend.repository.UsersRepository;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.Map;

@Component
public class JWTProvider {

    // Move to properties
    @Value("${jwt.secret.access}")
    private String secretAccess;

    @Value("${jwt.secret.refresh}")
    private String secretRefresh;

    UsersRepository usersRepository;
    private Map<String, String> refreshStorage = new HashMap<>();

    private String jwtHeader;
    private String tokenIssuer;

    public JWTProvider(@Autowired UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
        this.jwtHeader = createJWTHeader();
        this.tokenIssuer = "tekassh1SpringServer";
    }

    public String generateAccessToken(String username) {
        Algorithm algorithm = Algorithm.HMAC256(secretAccess);

        final LocalDateTime now = LocalDateTime.now();
        final Instant accessExpirationInstant = now.plusMinutes(30).atZone(ZoneId.systemDefault()).toInstant();

        String token = JWT.create()
                .withHeader(jwtHeader)
                .withIssuer(tokenIssuer)
                .withClaim("username", username)
                .withExpiresAt(accessExpirationInstant)
                .sign(algorithm);

        return token;
    }

    public String generateRefreshToken(String username) {
        if (refreshStorage.containsKey(username)) refreshStorage.remove(username);

        Algorithm algorithm = Algorithm.HMAC256(secretRefresh);

        final LocalDateTime now = LocalDateTime.now();
        final Instant refreshExpirationInstant = now.plusDays(30).atZone(ZoneId.systemDefault()).toInstant();

        String token = JWT.create()
                .withHeader(jwtHeader)
                .withIssuer(tokenIssuer)
                .withClaim("username", username)
                .withExpiresAt(refreshExpirationInstant)
                .sign(algorithm);

        refreshStorage.put(username, token);

        return token;
    }

    private String createJWTHeader() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            ObjectNode header = mapper.createObjectNode();
            header.put("alg", "HMAC256");
            header.put("typ", "JWT");

            return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(header);
        }
        catch (JsonProcessingException e) {
            return null;
        }
    }

    public void removeRefreshToken(String username) {
        refreshStorage.remove(username);
    }

    public boolean validateAccessToken(String username, String token) {
        if (username == null || token == null) return false;
        return validateToken(username, token, secretAccess);
    }

    public boolean validateRefreshToken(String username, String token) {
        if (username == null || token == null) return false;
        return refreshStorage.containsKey(username) && refreshStorage.get(username).equals(token);
    }

    private boolean validateToken(String username, String token, String secret) {
        Algorithm algorithm = Algorithm.HMAC256(secret);
        try {
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(tokenIssuer)
                    .withClaim("username", username)
                    .build();

            verifier.verify(token);
            return true;
        }
        catch (JWTVerificationException e) {
            return false;
        }

    }
}