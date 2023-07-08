package yassine.haouzane.filesharing_ws.payload;

public class FilePropertiesException extends RuntimeException {

    public FilePropertiesException(String message, String filename) {
        super(message);
    }

    public FilePropertiesException(String message, Throwable cause) {
        super(message, cause);
    }
}
