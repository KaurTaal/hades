package ut.ee.hades.app.web.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.util.CollectionUtils;
import ut.ee.hades.app.dao.entity.SolutionEntity;
import ut.ee.hades.app.dao.entity.TestSuiteEntity;
import ut.ee.hades.app.util.DocumentUtils;

import java.util.LinkedList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SolutionDTO {

    private Long solutionId;
    private Long exerciseId;
    private Long fileId;
    private String contentHtml;
    private String name;

    public static List<SolutionDTO> mapList(List<SolutionEntity> solutionEntityList) {
        List<SolutionDTO> solutionDTOList = new LinkedList<>();

        if (!CollectionUtils.isEmpty(solutionEntityList)) {
            solutionEntityList.forEach(solution -> solutionDTOList.add(SolutionDTO.map(solution)));
        }
        return solutionDTOList;
    }

    public static SolutionDTO map(SolutionEntity solutionEntity) {
        if (solutionEntity != null) {
            SolutionDTO solutionDTO = new SolutionDTO();
            solutionDTO.setSolutionId(solutionEntity.getSolutionId());
            solutionDTO.setExerciseId(solutionEntity.getExerciseEntity().getExerciseId());
            solutionDTO.setFileId(solutionEntity.getFile().getFileId());
            solutionDTO.setContentHtml(DocumentUtils.convertPythonToHtml(solutionEntity.getFile().getContent()));
            solutionDTO.setName(solutionEntity.getFile().getName());
            return solutionDTO;
        }
        return new SolutionDTO();
    }
}
