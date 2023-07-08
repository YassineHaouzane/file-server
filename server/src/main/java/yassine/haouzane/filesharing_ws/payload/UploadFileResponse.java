package yassine.haouzane.filesharing_ws.payload;

import lombok.Getter;

public class UploadFileResponse {
    @Getter
    private String fileName;
    @Getter
    private String fileDownloadUri;
    @Getter
    private String fileType;
    @Getter
    private long size;

    public UploadFileResponse(String fileName, String fileDownloadUri, String fileType, long size) {
        this.fileName = fileName;
        this.fileDownloadUri = fileDownloadUri;
        this.fileType = fileType;
        this.size = size;
    }

}
