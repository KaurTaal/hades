package ut.ee.hades.app.web.services;

import org.springframework.web.multipart.MultipartFile;
import ut.ee.hades.app.exceptions.system.HADESInvalidCourseException;
import ut.ee.hades.app.web.model.dto.ManualDTO;

import java.io.IOException;
import java.util.List;

public interface ManualService {

    List<ManualDTO> getAllManuals();

    ManualDTO createManual(MultipartFile uploadedFile, Integer year, String courseCode) throws IOException, HADESInvalidCourseException;

    void deleteManualById(Long manualId) throws IOException;
}
