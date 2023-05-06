package ut.ee.hades.app.web.services;

import org.springframework.web.multipart.MultipartFile;
import ut.ee.hades.app.exceptions.system.HADESInvalidCourseException;
import ut.ee.hades.app.web.model.dto.ManualDTO;

import java.io.IOException;
import java.util.List;

public interface ManualService {

    /**
     * Retrieves all manuals
     * @return - all manuals
     */
    List<ManualDTO> getAllManuals();


    /**
     * Creates a new manual
     * @param uploadedFile - uploaded file
     * @param year - when the file was used or will be used
     * @param courseCode - code that represents which course the uploaded file belongs to
     * @return - new manual
     * @throws IOException;
     * @throws HADESInvalidCourseException;
     */
    ManualDTO createManual(MultipartFile uploadedFile, Integer year, String courseCode) throws IOException, HADESInvalidCourseException;


    /**
     * Deletes the manual with given id
     * @param manualId - manual id
     * @throws IOException;
     */
    void deleteManualById(Long manualId) throws IOException;
}
