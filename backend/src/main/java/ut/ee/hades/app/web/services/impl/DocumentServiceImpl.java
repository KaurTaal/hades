package ut.ee.hades.app.web.services.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ut.ee.hades.app.dao.entity.ExerciseEntity;
import ut.ee.hades.app.dao.entity.FileEntity;
import ut.ee.hades.app.dao.entity.ManualEntity;
import ut.ee.hades.app.dao.repository.DocumentRepository;
import ut.ee.hades.app.dao.repository.ExerciseRepository;
import ut.ee.hades.app.dao.repository.LabelRepository;
import ut.ee.hades.app.dao.repository.ManualRepository;
import ut.ee.hades.app.exceptions.UiAlertWarningException;
import ut.ee.hades.app.util.AllowedMimeUtils;
import ut.ee.hades.app.util.DocumentUtils;
import ut.ee.hades.app.web.model.dto.ExerciseDTO;
import ut.ee.hades.app.web.model.dto.ManualDTO;
import ut.ee.hades.app.web.services.DocumentService;
import ut.ee.hades.app.web.services.DownloadService;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class DocumentServiceImpl implements DocumentService {

    private final LabelRepository labelRepository;
    private final DocumentRepository documentRepository;
    private final ManualRepository manualRepository;
    private final ExerciseRepository exerciseRepository;
    private final DownloadService downloadService;


    @Override
    public List<ManualDTO> getAllManuals() {
        List<ManualDTO> manualDTOList = new LinkedList<>();
        List<ManualEntity> manualEntityList = manualRepository.findAll();


        manualEntityList.forEach(manual -> {
            try {
                manualDTOList.add(ManualDTO.map(manual, DocumentUtils.getInputStream(manual.getFile().getContent())));
            } catch (IOException e) {
                throw new UiAlertWarningException("ExceptionCodeEnum.TEST_ERROR");
            }
        });
        return manualDTOList;
    }

    @Override
    public ManualDTO createManual(MultipartFile uploadedFile) throws IOException {
        validateFileType(uploadedFile);

        ManualEntity manualEntity = new ManualEntity();
        FileEntity fileEntity = prepareFileSave(uploadedFile);
        manualEntity.setFile(fileEntity);

        documentRepository.save(fileEntity);
        manualRepository.save(manualEntity);
        log.info("File {} created", fileEntity);
        log.info("Manual {} created", manualEntity);

        return ManualDTO.map(manualEntity, uploadedFile.getInputStream());
    }

    @Override
    public void deleteManualById(Long manualId) {
        manualRepository.deleteById(manualId); //TODO Delete file aswell
    }

    @Override
    public List<ExerciseDTO> getAllExercises() {
        List<ExerciseEntity> exerciseEntities = exerciseRepository.findAll();
        return ExerciseDTO.mapList(exerciseEntities);
    }

    @Override
    public void saveExercise(Long fileId, MultipartFile modifiedFile) throws IOException {
        FileEntity byId = documentRepository.getById(fileId);


        byId.setContent(modifiedFile.getBytes());
        byId.setSize(modifiedFile.getSize());
        documentRepository.save(byId);
    }

    @Override
    public ExerciseDTO createExercise(MultipartFile uploadedFile) throws IOException {
        validateFileType(uploadedFile);

        ExerciseEntity exerciseEntity = new ExerciseEntity();
        FileEntity fileEntity = prepareFileSave(uploadedFile);
        exerciseEntity.setFile(fileEntity);

        documentRepository.save(fileEntity);
        exerciseRepository.save(exerciseEntity);
        log.info("File {} created", fileEntity);
        log.info("Exercise {} created", exerciseEntity);

        return ExerciseDTO.map(exerciseEntity, uploadedFile.getInputStream());
    }



    @Override
    public void deleteExerciseById(Long exerciseId) {
        exerciseRepository.deleteById(exerciseId);
    }

    @Override
    public ResponseEntity<Resource> downloadDocumentById(Long docId) {
        FileEntity document = documentRepository.getById(docId);
        ByteArrayResource resource = new ByteArrayResource(document.getContent());
        return downloadService.downloadDoc(resource, document);
    }

    private FileEntity prepareFileSave(MultipartFile file) throws IOException {
        FileEntity fileEntity = new FileEntity();
        fileEntity.setContent(file.getBytes());
        fileEntity.setSize(file.getSize());
        fileEntity.setMimeType(file.getContentType());
        fileEntity.setName(file.getOriginalFilename());

        return fileEntity;
    }

    private void validateFileType(MultipartFile file) {
        if (AllowedMimeUtils.mimeMap.get(file.getContentType()) == null) {
            log.error("Not allowed file {} type save", file);
            throw new UiAlertWarningException("ExceptionCodeEnum.NOT_ALLOWED_FILE_TYPE");
        }
    }
}
