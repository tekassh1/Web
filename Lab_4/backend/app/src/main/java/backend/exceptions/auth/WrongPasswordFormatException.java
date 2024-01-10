package backend.exceptions.auth;

public class WrongPasswordFormatException extends IllegalArgumentException {
    public WrongPasswordFormatException(String msg) {
        super(msg);
    }
}
