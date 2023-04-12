package ut.ee.hades.app.web.services;

import org.springframework.web.multipart.MultipartFile;
import ut.ee.hades.app.web.model.dto.ExerciseDTO;
import ut.ee.hades.app.web.model.dto.SolutionDTO;
import ut.ee.hades.app.web.model.dto.TestSuiteDTO;

import java.io.IOException;
import java.util.List;

public interface ExerciseService {

    List<ExerciseDTO> getAllExercises();

    ExerciseDTO createExercise(MultipartFile documentFile, List<String> labels, Integer year, String courseCode, List<MultipartFile> solutionFiles, List<MultipartFile> testSuiteFiles) throws IOException;

    void deleteExerciseById(Long exerciseId) throws IOException;

    TestSuiteDTO createTestSuite(Long parentId, MultipartFile testSuiteFile) throws IOException;

    void deleteTestSuiteById(Long testSuiteId);

    SolutionDTO createSolution(Long parentId, MultipartFile solutionFile) throws IOException;

    void deleteSolutionById(Long solutionId);

}
