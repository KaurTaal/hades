package ut.ee.hades.app.web.services;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import ut.ee.hades.app.web.model.dto.ExerciseDTO;
import ut.ee.hades.app.web.model.dto.ManualDTO;

import java.io.IOException;
import java.util.List;

public interface DocumentService {
    List<ManualDTO> getAllManuals();

    ManualDTO createManual(MultipartFile uploadedFile) throws IOException;

    void deleteManualById(Long manualId) throws IOException;

    List<ExerciseDTO> getAllExercises();

    void saveExercise(Long fileId, MultipartFile modifiedFile) throws IOException;

    ExerciseDTO createExercise(MultipartFile uploadedFile) throws IOException;

    void deleteExerciseById(Long exerciseId) throws IOException;

    ResponseEntity<Resource> downloadDocumentById(Long docId);
}
