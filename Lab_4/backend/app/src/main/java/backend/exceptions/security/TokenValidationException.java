package backend.exceptions.security;

public class TokenValidationException extends RuntimeException {
    public TokenValidationException(String msg) {
        super(msg);
    }
}