package backend.exceptions.points;

public class WrongPointFormatException extends Exception {
    public WrongPointFormatException(String msg) {
        super(msg);
    }
}