package ut.ee.hades.app.web.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ut.ee.hades.app.dao.entity.ManualEntity;
import ut.ee.hades.app.util.DocumentUtils;

import java.io.IOException;
import java.io.InputStream;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ManualDTO {
    private Long manualId;
    private Long docId;
    private String contentHtml;
    private String name;


    public static ManualDTO map(ManualEntity manualDoc, InputStream stream) throws IOException {
        ManualDTO manualDTO = new ManualDTO();
        manualDTO.setManualId(manualDoc.getId());
        manualDTO.setDocId(manualDoc.getDocument().getId());
        manualDTO.setName(manualDoc.getDocument().getName());
        manualDTO.setContentHtml(DocumentUtils.convertToHtml(stream));
        return manualDTO;
    }

}
