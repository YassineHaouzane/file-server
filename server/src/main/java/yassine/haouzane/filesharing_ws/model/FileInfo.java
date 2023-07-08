package yassine.haouzane.filesharing_ws.model;

import lombok.Getter;

public class FileInfo {
    @Getter
    private final String name;
    @Getter
    private final long filesize;

    public FileInfo(String name, long filesize) {
        this.name = name;
        this.filesize = filesize;
    }
}
