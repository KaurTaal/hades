package ut.ee.hades.app.web.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ut.ee.hades.app.dao.entity.ExerciseEntity;
import ut.ee.hades.app.util.DocumentUtils;

import java.io.IOException;
import java.io.InputStream;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseDTO  {
    private Long exerciseId;
    private Long docId;
    private String contentHtml;
    private String name;

    public static ExerciseDTO map(ExerciseEntity exerciseEntity, InputStream stream) throws IOException {
        ExerciseDTO exerciseDTO = new ExerciseDTO();
        exerciseDTO.setExerciseId(exerciseEntity.getId());
        exerciseDTO.setDocId(exerciseEntity.getDocument().getId());
        exerciseDTO.setName(exerciseEntity.getDocument().getName());
        exerciseDTO.setContentHtml(DocumentUtils.convertToHtml(stream));
        return exerciseDTO;
    }
}