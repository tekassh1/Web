package backend.exceptions.auth;

public class WrongCredsException extends RuntimeException {
    public WrongCredsException(String msg) {
        super(msg);
    }
}