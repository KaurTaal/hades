package ut.ee.hades.app.web.controllers.secure;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ut.ee.hades.app.web.model.dto.ExerciseDTO;
import ut.ee.hades.app.web.model.dto.SolutionDTO;
import ut.ee.hades.app.web.model.dto.TestSuiteDTO;
import ut.ee.hades.app.web.services.ExerciseService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/exercise")
@RequiredArgsConstructor
@Slf4j
public class ExerciseController {

    private final ExerciseService exerciseService;


    @GetMapping(value = "/getAllExercises")
    public @ResponseBody List<ExerciseDTO> getExercisesList() {
        return exerciseService.getAllExercises();
    }

    @PostMapping(value = "/createExercise", consumes = "multipart/form-data")
    public @ResponseBody ExerciseDTO createExercise(@RequestParam(value = "documentFile") MultipartFile documentFile,
                                                    @RequestParam(value = "labels") List<String> labels,
                                                    @RequestParam(value = "year") Integer year,
                                                    @RequestParam(value = "courseCode") String courseCode,
                                                    @RequestParam(value = "solutionFiles[]", required = false) List<MultipartFile> solutionFiles,
                                                    @RequestParam(value = "testSuiteFiles[]", required = false) List<MultipartFile> testSuiteFiles)
            throws IOException {
        return exerciseService.createExercise(documentFile, labels, year, courseCode, solutionFiles, testSuiteFiles);
    }

    @DeleteMapping(value = "/deleteExercise/{exerciseId}")
    public @ResponseBody void deleteExercise(@PathVariable long exerciseId) throws IOException {
        exerciseService.deleteExerciseById(exerciseId);
    }

    @PostMapping(value = "/createTestSuite/{parentId}", consumes = "multipart/form-data")
    public @ResponseBody TestSuiteDTO createTestSuite(@PathVariable Long parentId, @RequestParam(value = "testSuiteFile") MultipartFile testSuiteFile) throws IOException {
        return exerciseService.createTestSuite(parentId, testSuiteFile);
    }

    @DeleteMapping(value = "/deleteTestSuite/{testSuiteId}")
    public @ResponseBody void deleteTestSuite(@PathVariable Long testSuiteId) {
        exerciseService.deleteTestSuiteById(testSuiteId);
    }

    @PostMapping(value = "/createSolution/{parentId}", consumes = "multipart/form-data")
    public @ResponseBody SolutionDTO createSolution(@PathVariable Long parentId, @RequestParam(value = "solutionFile") MultipartFile solutionFile) throws IOException {
        return exerciseService.createSolution(parentId, solutionFile);
    }

    @DeleteMapping(value = "/deleteSolution/{solutionId}")
    public @ResponseBody void deleteSolution(@PathVariable Long solutionId) {
        exerciseService.deleteSolutionById(solutionId);
    }

}
