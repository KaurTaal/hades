package ut.ee.hades.app.web.controllers.secure;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ut.ee.hades.app.exceptions.system.HADESInvalidCourseException;
import ut.ee.hades.app.web.model.dto.ExerciseDTO;
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
    public @ResponseBody ExerciseDTO createExercise(@RequestParam("documentFile") MultipartFile documentFile,
                                                    @RequestParam("labels") List<String> labels,
                                                    @RequestParam("year") Integer year,
                                                    @RequestParam("courseCode") String courseCode,
                                                    @RequestParam(value = "solutionFile", required = false) MultipartFile solutionFile)
            throws IOException, HADESInvalidCourseException {
        return exerciseService.createExercise(documentFile, labels, year, courseCode, solutionFile);
    }

    @DeleteMapping(value = "/deleteExercise/{exerciseId}")
    public @ResponseBody void deleteExercise(@PathVariable long exerciseId) throws IOException {
        exerciseService.deleteExerciseById(exerciseId);
    }

}
