package ut.ee.hades.app.web.services.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ut.ee.hades.app.dao.entity.ExerciseEntity;
import ut.ee.hades.app.dao.entity.FileEntity;
import ut.ee.hades.app.dao.repository.FileRepository;
import ut.ee.hades.app.dao.repository.ExerciseRepository;
import ut.ee.hades.app.dao.repository.LabelRepository;
import ut.ee.hades.app.util.DocumentUtils;
import ut.ee.hades.app.web.model.dto.ExerciseDTO;
import ut.ee.hades.app.web.services.ExerciseService;

import java.io.IOException;
import java.util.List;


@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ExerciseServiceImpl implements ExerciseService {

    private final FileRepository fileRepository;

    private final LabelRepository labelRepository;

    private final ExerciseRepository exerciseRepository;


    @Override
    public List<ExerciseDTO> getAllExercises() {
        List<ExerciseEntity> exerciseEntities = exerciseRepository.findAll();
        return ExerciseDTO.mapList(exerciseEntities);
    }

    @Override
    public ExerciseDTO createExercise(MultipartFile uploadedFile) throws IOException {
        DocumentUtils.validateFileType(uploadedFile);

        ExerciseEntity exerciseEntity = new ExerciseEntity();
        FileEntity fileEntity = DocumentUtils.prepareFileSave(uploadedFile);
        exerciseEntity.setFile(fileEntity);

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


}
