package gogodocs.backend.exceptions;

public class UserNotFound extends RuntimeException {
    public UserNotFound() {
        super();
    }

    public UserNotFound(String string) {
        super(string);
    }
}
