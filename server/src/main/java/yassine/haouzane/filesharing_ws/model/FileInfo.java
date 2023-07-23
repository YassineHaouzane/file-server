package yassine.haouzane.filesharing_ws.model;

import lombok.Getter;

import java.io.File;

public class FileInfo {
    @Getter
    private final String name;
    @Getter
    private final long size;
    @Getter
    private final String fileType;

    public FileInfo(String name, long size, String fileType) {
        this.name = name;
        this.size = size;
        this.fileType = fileType;
    }



    public static String getFileExtension(File file) {
        String name = file.getName();
        int lastIndexOf = name.lastIndexOf(".");
        if (lastIndexOf == -1) {
            return ""; // empty extension
        }
        return name.substring(lastIndexOf);
    }

}
