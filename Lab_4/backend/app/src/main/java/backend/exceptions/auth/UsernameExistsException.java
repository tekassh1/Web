package backend.exceptions.auth;

public class UsernameExistsException extends RuntimeException {
    public UsernameExistsException(String msg) {
        super(msg);
    }
}
