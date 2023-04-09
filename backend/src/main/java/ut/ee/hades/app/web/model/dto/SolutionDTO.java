package ut.ee.hades.app.web.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ut.ee.hades.app.dao.entity.SolutionEntity;
import ut.ee.hades.app.util.DocumentUtils;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SolutionDTO {

    private Long solutionId;
    private Long exerciseId;
    private Long fileId;
    private String contentHtml;
    private String name;


    public static SolutionDTO map(SolutionEntity solutionEntity) {
        SolutionDTO solutionDTO = new SolutionDTO();
        solutionDTO.setSolutionId(solutionEntity.getSolutionId());
        solutionDTO.setExerciseId(solutionEntity.getExerciseEntity().getExerciseId());
        solutionDTO.setFileId(solutionEntity.getFile().getFileId());
        solutionDTO.setContentHtml(DocumentUtils.convertPythonToHtml(solutionEntity.getFile().getContent()));
        solutionDTO.setName(solutionEntity.getFile().getName());
        return solutionDTO;
    }
}
