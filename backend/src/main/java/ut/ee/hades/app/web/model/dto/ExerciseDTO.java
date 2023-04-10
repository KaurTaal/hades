package ut.ee.hades.app.web.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ut.ee.hades.app.dao.entity.ExerciseEntity;
import ut.ee.hades.app.enums.DocumentTypeEnum;
import ut.ee.hades.app.enums.ExceptionCodeEnum;
import ut.ee.hades.app.enums.UiAlertEnum;
import ut.ee.hades.app.exceptions.system.HADESConvertException;
import ut.ee.hades.app.exceptions.ui.UiAlertDangerException;
import ut.ee.hades.app.util.DocumentUtils;

import java.io.IOException;
import java.io.InputStream;
import java.util.LinkedList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseDTO  {
    private Long exerciseId;
    private Long fileId;
    private String contentHtml;
    private String name;
    private List<LabelDTO> labelDTOList;
    private Integer year;
    private CourseDTO courseDTO;
    private SolutionDTO solutionDTO;
    private List<TestSuiteDTO> testSuiteDTOList;
    private final String docType = DocumentTypeEnum.EXERCISE.getValue();

    public static List<ExerciseDTO> mapList (List<ExerciseEntity> exerciseEntities) {
        List<ExerciseDTO> exerciseDTOS = new LinkedList<>();

        exerciseEntities.forEach(exercise -> {
            try {
                exerciseDTOS.add(ExerciseDTO.map(exercise, DocumentUtils.getInputStream(exercise.getFile().getContent())));
            } catch (IOException e) {
                throw new UiAlertDangerException(UiAlertEnum.CONTENT_CONVERSION_ERROR.getName());
            }
        });

        return exerciseDTOS;
    }

    public static ExerciseDTO map(ExerciseEntity exerciseEntity, InputStream stream) throws IOException {
        ExerciseDTO exerciseDTO = new ExerciseDTO();
        exerciseDTO.setExerciseId(exerciseEntity.getExerciseId());
        exerciseDTO.setFileId(exerciseEntity.getFile().getFileId());
        exerciseDTO.setName(exerciseEntity.getFile().getName());
        exerciseDTO.setContentHtml(DocumentUtils.convertDocumentContentToHtml(stream));
        exerciseDTO.setLabelDTOList(LabelDTO.mapList(exerciseEntity.getLabelEntityList()));
        exerciseDTO.setYear(exerciseEntity.getYear());
        exerciseDTO.setCourseDTO(CourseDTO.map(exerciseEntity.getCourseEntity()));
        exerciseDTO.setSolutionDTO(SolutionDTO.map(exerciseEntity.getSolutionEntity()));
        exerciseDTO.setTestSuiteDTOList(TestSuiteDTO.mapList(exerciseEntity.getTestSuiteEntityList()));
        return exerciseDTO;
    }
}
