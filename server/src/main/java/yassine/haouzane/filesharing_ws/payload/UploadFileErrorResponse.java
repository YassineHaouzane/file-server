package yassine.haouzane.filesharing_ws.payload;

public class UploadFileErrorResponse extends UploadFileResponse {

    public UploadFileErrorResponse(String fileName, String fileDownloadUri, String fileType, long size) {
        super(fileName, fileDownloadUri, fileType, size);
    }

}
