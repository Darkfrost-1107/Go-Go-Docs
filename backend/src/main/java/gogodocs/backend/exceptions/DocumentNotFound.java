package gogodocs.backend.exceptions;

public class DocumentNotFound extends RuntimeException {
    public DocumentNotFound() {
        super();
    }

    public DocumentNotFound(String message) {
        super(message);
    }
}
