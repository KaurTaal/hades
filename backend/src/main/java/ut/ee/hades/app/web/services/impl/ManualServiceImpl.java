package ut.ee.hades.app.web.services.impl;


import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ut.ee.hades.app.dao.entity.CourseEntity;
import ut.ee.hades.app.dao.entity.FileEntity;
import ut.ee.hades.app.dao.entity.ManualEntity;
import ut.ee.hades.app.dao.repository.CourseRepository;
import ut.ee.hades.app.dao.repository.FileRepository;
import ut.ee.hades.app.dao.repository.ManualRepository;
import ut.ee.hades.app.enums.UiAlertEnum;
import ut.ee.hades.app.exceptions.ui.UiAlertWarningException;
import ut.ee.hades.app.util.DocumentUtils;
import ut.ee.hades.app.web.model.dto.ManualDTO;
import ut.ee.hades.app.web.services.ManualService;

import java.io.IOException;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ManualServiceImpl implements ManualService {

    private final FileRepository fileRepository;
    private final ManualRepository manualRepository;
    private final CourseRepository courseRepository;


    @Override
    public List<ManualDTO> getAllManuals() {
        List<ManualEntity> manualEntityList = manualRepository.findAll();
        return ManualDTO.mapList(manualEntityList);
    }


    @Override
    public ManualDTO createManual(MultipartFile uploadedFile, Integer year, String courseCode) throws IOException {
        DocumentUtils.validateFileType(uploadedFile);

        CourseEntity courseEntity = courseRepository.findByCourseCode(courseCode);

        if (courseEntity == null) {
            throw new UiAlertWarningException(UiAlertEnum.INVALID_COURSE_ERROR.getName());
        }

        ManualEntity manualEntity = new ManualEntity();
        FileEntity fileEntity = DocumentUtils.prepareFileSave(uploadedFile);
        manualEntity.setFile(fileEntity);
        manualEntity.setYear(year);
        manualEntity.setCourseEntity(courseEntity);

        fileRepository.save(fileEntity);
        manualRepository.save(manualEntity);
        log.info("File {} created", fileEntity);
        log.info("Manual {} created", manualEntity);

        return ManualDTO.map(manualEntity, uploadedFile.getInputStream());
    }


    @Override
    public void deleteManualById(Long manualId) {
        manualRepository.deleteById(manualId);
    }


}
