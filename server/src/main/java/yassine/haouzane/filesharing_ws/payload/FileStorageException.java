package yassine.haouzane.filesharing_ws.payload;



public class FileStorageException extends RuntimeException {

    private String filename;

    public FileStorageException(String message, String filename) {
        super(message);
        this.filename = filename;
    }

    public FileStorageException(String message, String filename, Throwable cause) {
        super(message, cause);
        this.filename = filename;
    }
}
