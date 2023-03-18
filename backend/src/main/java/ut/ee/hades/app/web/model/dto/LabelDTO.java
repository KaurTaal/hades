package ut.ee.hades.app.web.model.dto;

import ut.ee.hades.app.dao.entity.LabelEntity;
import ut.ee.hades.app.enums.LabelType;

public class LabelDTO {
    private Long labelId;
    private String labelName;


    public static LabelDTO map(LabelEntity label) {
        LabelDTO labelDTO = new LabelDTO();
        labelDTO.setLabelId(label.getLabelId());
        labelDTO.setLabelName(label.getName());
        return labelDTO;
    }


    public Long getLabelId() {
        return labelId;
    }

    public void setLabelId(Long labelId) {
        this.labelId = labelId;
    }

    public String getLabelName() {
        return labelName;
    }

    public void setLabelName(String labelName) {
        this.labelName = labelName;
    }
}
