package ut.ee.hades.app.web.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ut.ee.hades.app.dao.entity.ExerciseEntity;
import ut.ee.hades.app.enums.DocumentTypeEnum;
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
    private final String docType = DocumentTypeEnum.EXERCISE.getValue();

    public static List<ExerciseDTO> mapList (List<ExerciseEntity> exerciseEntities) {
        List<ExerciseDTO> exerciseDTOS = new LinkedList<>();

        exerciseEntities.forEach(exercise -> {
            try {
                exerciseDTOS.add(ExerciseDTO.map(exercise, DocumentUtils.getInputStream(exercise.getFile().getContent())));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });

        return exerciseDTOS;
    }

    public static ExerciseDTO map(ExerciseEntity exerciseEntity, InputStream stream) throws IOException {
        ExerciseDTO exerciseDTO = new ExerciseDTO();
        exerciseDTO.setExerciseId(exerciseEntity.getId());
        exerciseDTO.setFileId(exerciseEntity.getFile().getId());
        exerciseDTO.setName(exerciseEntity.getFile().getName());
        exerciseDTO.setContentHtml(DocumentUtils.convertToHtml(stream));
        return exerciseDTO;
    }
}
