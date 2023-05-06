package ut.ee.hades.app.web.services;

import org.springframework.web.multipart.MultipartFile;
import ut.ee.hades.app.web.model.dto.ExerciseDTO;
import ut.ee.hades.app.web.model.dto.SolutionDTO;
import ut.ee.hades.app.web.model.dto.TestSuiteDTO;

import java.io.IOException;
import java.util.List;

public interface ExerciseService {

    /**
     * Retrieves all exercises
     * @return - all exercises
     */
    List<ExerciseDTO> getAllExercises();

    /**
     * Creates an instance of exercise to the database
     * @param documentFile - user uploaded file
     * @param labels - selected labels that will be applied to document
     * @param year - when file was used or will be used
     * @param courseCode - course code that determines to which course the file belongs
     * @param solutionFiles - corresponding solution program files
     * @param testSuiteFiles - corresponding test suite program files
     * @return - created exercise
     * @throws IOException;
     */
    ExerciseDTO createExercise(MultipartFile documentFile, List<String> labels, Integer year, String courseCode, List<MultipartFile> solutionFiles, List<MultipartFile> testSuiteFiles) throws IOException;


    /**
     * Deletes the exercise with the given id
     * @param exerciseId - exercise id
     * @throws IOException;
     */
    void deleteExerciseById(Long exerciseId) throws IOException;


    /**
     * Creates an instance of a test suite for the given exercise. Used when user is adding test suites independently
     * @param parentId - exercise id to which the test suite belongs
     * @param testSuiteFile - test suite file
     * @return - the created test suite
     * @throws IOException;
     */
    TestSuiteDTO createTestSuite(Long parentId, MultipartFile testSuiteFile) throws IOException;


    /**
     * Deletes the test suite with given id
     * @param testSuiteId - test suite id
     */
    void deleteTestSuiteById(Long testSuiteId);


    /**
     * Creates an instance of a solution for the given exercise. Used when user is adding solution independently
     * @param parentId - exercise id to which the solution belongs
     * @param solutionFile - solution file
     * @return - created solution
     * @throws IOException;
     */
    SolutionDTO createSolution(Long parentId, MultipartFile solutionFile) throws IOException;


    /**
     * Deletes the solution with given id
     * @param solutionId - solution id
     */
    void deleteSolutionById(Long solutionId);

}
