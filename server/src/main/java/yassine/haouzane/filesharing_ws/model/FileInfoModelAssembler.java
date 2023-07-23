package yassine.haouzane.filesharing_ws.model;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;
import yassine.haouzane.filesharing_ws.controllers.FileController;

@Component
public class FileInfoModelAssembler implements RepresentationModelAssembler<FileInfo, EntityModel<FileInfo>> {
    @Override
    public EntityModel<FileInfo> toModel(FileInfo file) {

        return EntityModel.of(file,
                linkTo(methodOn(FileController.class).downloadFile(file.getName())).withSelfRel(),
                linkTo(methodOn(FileController.class).getFilesData()).withRel("file_info"));
    }
}
