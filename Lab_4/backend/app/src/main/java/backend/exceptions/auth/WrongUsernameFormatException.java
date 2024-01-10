package backend.exceptions.auth;

public class WrongUsernameFormatException extends IllegalArgumentException{
    public WrongUsernameFormatException(String msg) {
        super(msg);
    }
}
