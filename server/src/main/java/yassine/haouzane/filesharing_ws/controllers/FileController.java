package yassine.haouzane.filesharing_ws.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import yassine.haouzane.filesharing_ws.model.FileInfo;
import yassine.haouzane.filesharing_ws.model.FileInfoModelAssembler;
import yassine.haouzane.filesharing_ws.payload.FileNotFoundException;
import yassine.haouzane.filesharing_ws.payload.FileStorageException;
import yassine.haouzane.filesharing_ws.services.FileStorageService;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/file")
public class FileController {

    @Autowired
    private FileInfoModelAssembler assembler;

    @Autowired
    private HttpServletRequest servletRequest;

    @Autowired
    private FileStorageService fileStorageService;
    private static final Logger logger = LoggerFactory.getLogger(FileController.class);

    @GetMapping
    public ResponseEntity<List<EntityModel<FileInfo>>> getFilesData() {
        List<EntityModel<FileInfo>> fileInfosEntity = fileStorageService.getFilesInfo().stream()
                .map(fileInfo -> assembler.toModel(fileInfo)).toList();
        return ResponseEntity.ok().body(fileInfosEntity);
    }

    @GetMapping("/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
        Resource resource = fileStorageService.loadFileAsResource(fileName);

        String contentType = null;
        try {
            contentType = servletRequest.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            logger.info("Could not determine file type.");
        }

        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @DeleteMapping("/{fileName:.+}")
    public ResponseEntity<EntityModel<FileInfo>> removeFile(@PathVariable String fileName) {
        try {
            Optional<FileInfo> info = fileStorageService.removeFile(fileName);
            return info.map(fileInfo -> ResponseEntity.ok()
                            .body(assembler.toModel(fileInfo)))
                    .orElseGet(() -> ResponseEntity.internalServerError().build());
        } catch (FileNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{fileName:.+}")
    public ResponseEntity<EntityModel<FileInfo>> renameFile(@PathVariable String fileName, @RequestBody FileInfo fileInfo) {
        try {
            Optional<FileInfo> info_o = fileStorageService.renameFile(fileName, fileInfo.getName());
            return info_o.map(info -> ResponseEntity.ok().body(assembler.toModel(info)))
                    .orElseGet(() -> ResponseEntity.internalServerError().build());
        } catch (FileNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    private Optional<FileInfo> uploadFile(MultipartFile file) {
        try {
            String fileName = fileStorageService.storeFile(file);
            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/downloadFile/")
                    .path(fileName)
                    .toUriString();
            return Optional.of(new FileInfo(fileName, file.getSize(), file.getContentType()));
        } catch (FileStorageException e) {
            return Optional.empty();
        }
    }

    @PostMapping
    public ResponseEntity<List<EntityModel<FileInfo>>> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
        var responseContent = Arrays.stream(files)
                .map(this::uploadFile)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .map(assembler::toModel).toList();
        return responseContent.isEmpty() ?
                ResponseEntity.noContent().build() : ResponseEntity.ok().body(responseContent);

    }
}