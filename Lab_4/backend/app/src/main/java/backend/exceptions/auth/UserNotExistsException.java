package backend.exceptions.auth;

public class UserNotExistsException extends Exception {
    public UserNotExistsException(String msg) {
        super(msg);
    }
}