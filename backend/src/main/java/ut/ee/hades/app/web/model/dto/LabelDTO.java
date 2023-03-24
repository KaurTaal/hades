package ut.ee.hades.app.web.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ut.ee.hades.app.dao.entity.LabelEntity;
import ut.ee.hades.app.enums.LabelType;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LabelDTO {
    private Long labelId;
    private String labelName;


    public static LabelDTO map(LabelEntity label) {
        LabelDTO labelDTO = new LabelDTO();
        labelDTO.setLabelId(label.getLabelId());
        labelDTO.setLabelName(label.getName());
        return labelDTO;
    }
}
