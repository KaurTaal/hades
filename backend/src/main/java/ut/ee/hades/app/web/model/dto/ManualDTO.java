package ut.ee.hades.app.web.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ut.ee.hades.app.dao.entity.ManualEntity;
import ut.ee.hades.app.enums.DocumentTypeEnum;
import ut.ee.hades.app.enums.ExceptionCodeEnum;
import ut.ee.hades.app.exceptions.system.HADESConvertException;
import ut.ee.hades.app.util.DocumentUtils;

import java.io.IOException;
import java.io.InputStream;
import java.util.LinkedList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ManualDTO {
    private Long manualId;
    private Long fileId;
    private String contentHtml;
    private String name;
    private Integer year;
    private CourseDTO courseDTO;
    private final String docType = DocumentTypeEnum.MANUAL.getValue();


    public static List<ManualDTO> mapList (List<ManualEntity> manualEntities) {
        List<ManualDTO> manualDTOs = new LinkedList<>();

        manualEntities.forEach(manual -> {
            try {
                manualDTOs.add(ManualDTO.map(manual, DocumentUtils.getInputStream(manual.getFile().getContent())));
            } catch (IOException e) {
                throw new HADESConvertException(ExceptionCodeEnum.CONTENT_CONVERT_ERROR.getName());
            }
        });

        return manualDTOs;
    }



    public static ManualDTO map(ManualEntity manualEntity, InputStream stream) throws IOException {
        ManualDTO manualDTO = new ManualDTO();
        manualDTO.setManualId(manualEntity.getManualId());
        manualDTO.setFileId(manualEntity.getFile().getFileId());
        manualDTO.setName(manualEntity.getFile().getName());
        manualDTO.setContentHtml(DocumentUtils.convertDocumentContentToHtml(stream));
        manualDTO.setYear(manualEntity.getYear());
        manualDTO.setCourseDTO(CourseDTO.map(manualEntity.getCourseEntity()));
        return manualDTO;
    }

}
