package ut.ee.hades.app.web.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.util.CollectionUtils;
import ut.ee.hades.app.dao.entity.ExerciseEntity;
import ut.ee.hades.app.dao.entity.LabelEntity;
import ut.ee.hades.app.util.DocumentUtils;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LabelDTO {
    private Long labelId;
    private String labelName;


    public static List<LabelDTO> mapList (List<LabelEntity> labelEntityList) {
        List<LabelDTO> labelDTOList = new LinkedList<>();

        if (!CollectionUtils.isEmpty(labelEntityList)) {
            labelEntityList.forEach(label -> labelDTOList.add(LabelDTO.map(label)));
        }

        return labelDTOList;
    }

    public static LabelDTO map(LabelEntity label) {
        LabelDTO labelDTO = new LabelDTO();
        labelDTO.setLabelId(label.getLabelId());
        labelDTO.setLabelName(label.getName());
        return labelDTO;
    }
}
