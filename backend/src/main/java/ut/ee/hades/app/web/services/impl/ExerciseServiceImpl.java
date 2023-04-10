package ut.ee.hades.app.web.services.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;
import ut.ee.hades.app.dao.entity.*;
import ut.ee.hades.app.dao.repository.*;
import ut.ee.hades.app.enums.UiAlertEnum;
import ut.ee.hades.app.exceptions.ui.UiAlertWarningException;
import ut.ee.hades.app.web.model.dto.ExerciseDTO;
import ut.ee.hades.app.web.services.ExerciseService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import static ut.ee.hades.app.util.DocumentUtils.prepareFileSave;
import static ut.ee.hades.app.util.DocumentUtils.validateFileType;


@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ExerciseServiceImpl implements ExerciseService {
    private final TestSuiteRepository testSuiteRepository;
    private final SolutionRepository solutionRepository;

    private final FileRepository fileRepository;

    private final LabelRepository labelRepository;

    private final ExerciseRepository exerciseRepository;

    private final CourseRepository courseRepository;

    @Override
    public List<ExerciseDTO> getAllExercises() {
        List<ExerciseEntity> exerciseEntities = exerciseRepository.findAll();
        return ExerciseDTO.mapList(exerciseEntities);
    }

    @Override
    public ExerciseDTO createExercise(MultipartFile documentFile, List<String> labels, Integer year, String courseCode, MultipartFile solutionFile, List<MultipartFile> testSuiteFiles) throws IOException {
        validateFileType(documentFile);

        CourseEntity courseEntity = courseRepository.findByCourseCode(courseCode);
        if (courseEntity == null) {
            throw new UiAlertWarningException(UiAlertEnum.INVALID_COURSE_ERROR.getName());
        }

        ExerciseEntity exerciseEntity = new ExerciseEntity();
        FileEntity fileEntity = prepareFileSave(documentFile);
        exerciseEntity.setFile(fileEntity);
        exerciseEntity.setYear(year);
        exerciseEntity.setCourseEntity(courseEntity);

        if (!CollectionUtils.isEmpty(labels)) {
            exerciseEntity.setLabelEntityList(createExerciseLabelsList(labels));
        }

        if (solutionFile != null) {
            handleSolutionFileSave(exerciseEntity, solutionFile);
        }

        if (!CollectionUtils.isEmpty(testSuiteFiles)) {
            handleTestSuiteFileSave(exerciseEntity, testSuiteFiles);
        }

        fileRepository.save(fileEntity);
        exerciseRepository.save(exerciseEntity);
        log.info("File {} created", fileEntity);
        log.info("Exercise {} created", exerciseEntity);


        return ExerciseDTO.map(exerciseEntity, documentFile.getInputStream());
    }

    @Override
    public void deleteExerciseById(Long exerciseId) {
        exerciseRepository.deleteById(exerciseId);
    }



    private List<LabelEntity> createExerciseLabelsList(List<String> labels) {
        List<LabelEntity> allExistingLabels = labelRepository.findAll();

        List<LabelEntity> exerciseLabels = new ArrayList<>();

        for (String label : labels) {
            Optional<LabelEntity> existing = allExistingLabels.stream().filter(labelEntity -> labelEntity.getName().equals(label)).findFirst();
            if (existing.isPresent()) {
                exerciseLabels.add(existing.get());
            }
            else {
                LabelEntity labelEntity = new LabelEntity();
                labelEntity.setName(label);
                exerciseLabels.add(labelEntity);
            }
        }

        labelRepository.saveAll(exerciseLabels);

        return exerciseLabels;
    }

    private void handleSolutionFileSave(ExerciseEntity exercise, MultipartFile solutionFile) throws IOException {
        validateFileType(solutionFile);

        SolutionEntity solutionEntity = new SolutionEntity();
        FileEntity fileEntity = prepareFileSave(solutionFile);

        solutionEntity.setFile(fileEntity);
        solutionEntity.setExerciseEntity(exercise);
        exercise.setSolutionEntity(solutionEntity);

        fileRepository.save(fileEntity);
        solutionRepository.save(solutionEntity);
        exerciseRepository.save(exercise);
    }

    private void handleTestSuiteFileSave(ExerciseEntity exercise, List<MultipartFile> testSuiteFiles) throws IOException {
        List<TestSuiteEntity> testSuiteEntityList = new LinkedList<>();
        for (MultipartFile testSuiteFile : testSuiteFiles) {
            validateFileType(testSuiteFile);

            TestSuiteEntity testSuiteEntity = new TestSuiteEntity();
            FileEntity fileEntity = prepareFileSave(testSuiteFile);

            testSuiteEntity.setFile(fileEntity);
            testSuiteEntity.setExerciseEntity(exercise);
            testSuiteEntityList.add(testSuiteEntity);

            fileRepository.save(fileEntity);
        }
        exercise.setTestSuiteEntityList(testSuiteEntityList);
        testSuiteRepository.saveAll(testSuiteEntityList);
        exerciseRepository.save(exercise);
    }
}
