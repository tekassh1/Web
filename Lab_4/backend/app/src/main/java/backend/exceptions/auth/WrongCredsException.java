package backend.exceptions.auth;

public class WrongCredsException extends Exception {
    public WrongCredsException(String msg) {
        super(msg);
    }
}