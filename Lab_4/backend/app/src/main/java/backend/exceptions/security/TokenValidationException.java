package backend.exceptions.security;

public class TokenValidationException extends Exception {
    public TokenValidationException(String msg) {
        super(msg);
    }
}