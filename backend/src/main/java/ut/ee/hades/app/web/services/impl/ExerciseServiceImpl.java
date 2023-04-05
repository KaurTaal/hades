package ut.ee.hades.app.web.services.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;
import ut.ee.hades.app.dao.entity.CourseEntity;
import ut.ee.hades.app.dao.entity.ExerciseEntity;
import ut.ee.hades.app.dao.entity.FileEntity;
import ut.ee.hades.app.dao.entity.LabelEntity;
import ut.ee.hades.app.dao.repository.CourseRepository;
import ut.ee.hades.app.dao.repository.FileRepository;
import ut.ee.hades.app.dao.repository.ExerciseRepository;
import ut.ee.hades.app.dao.repository.LabelRepository;
import ut.ee.hades.app.enums.ExceptionCodeEnum;
import ut.ee.hades.app.exceptions.system.HADESInvalidCourseException;
import ut.ee.hades.app.util.DocumentUtils;
import ut.ee.hades.app.web.model.dto.ExerciseDTO;
import ut.ee.hades.app.web.services.ExerciseService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ExerciseServiceImpl implements ExerciseService {

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
    public ExerciseDTO createExercise(MultipartFile uploadedFile, List<String> labels, Integer year, String courseCode) throws IOException, HADESInvalidCourseException {
        DocumentUtils.validateFileType(uploadedFile);

        CourseEntity courseEntity = courseRepository.findByCourseCode(courseCode);

        if (courseEntity == null) {
            throw new HADESInvalidCourseException(ExceptionCodeEnum.INVALID_COURSE_ERROR.getName());
        }

        ExerciseEntity exerciseEntity = new ExerciseEntity();
        FileEntity fileEntity = DocumentUtils.prepareFileSave(uploadedFile);
        exerciseEntity.setFile(fileEntity);
        exerciseEntity.setYear(year);
        exerciseEntity.setCourseEntity(courseEntity);

        if (!CollectionUtils.isEmpty(labels)) {
            exerciseEntity.setLabelEntityList(createExerciseLabelsList(labels));
        }

        fileRepository.save(fileEntity);
        exerciseRepository.save(exerciseEntity);
        log.info("File {} created", fileEntity);
        log.info("Exercise {} created", exerciseEntity);

        return ExerciseDTO.map(exerciseEntity, uploadedFile.getInputStream());
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

}
