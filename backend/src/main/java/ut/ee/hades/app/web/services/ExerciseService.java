package ut.ee.hades.app.web.services;

import org.springframework.web.multipart.MultipartFile;
import ut.ee.hades.app.web.model.dto.ExerciseDTO;

import java.io.IOException;
import java.util.List;

public interface ExerciseService {

    List<ExerciseDTO> getAllExercises();

    ExerciseDTO createExercise(MultipartFile uploadedFile) throws IOException;

    void deleteExerciseById(Long exerciseId) throws IOException;

}