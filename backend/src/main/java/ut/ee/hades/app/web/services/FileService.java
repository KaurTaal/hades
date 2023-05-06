package ut.ee.hades.app.web.services;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import ut.ee.hades.app.exceptions.system.HADESFileDownloadException;
import ut.ee.hades.app.exceptions.system.HADESFileSaveException;

import java.io.IOException;

public interface FileService {

    /**
     * Method for saving the edited document's new content
     * @param fileId - edited file's id
     * @param modifiedFile - modified file with new attributes
     * @throws IOException;
     * @throws HADESFileSaveException;
     */
    void saveEditedFile(Long fileId, MultipartFile modifiedFile) throws IOException, HADESFileSaveException;

    /**
     * Method for downloading a file
     * @param docId - downloadable document's id
     * @return - proper response for the frontend to start downloading the file
     * @throws HADESFileDownloadException;
     */
    ResponseEntity<Resource> downloadFileById(Long docId) throws HADESFileDownloadException;


    /**
     * Generates a new .docx document
     * @param modifiedContent - new document content as string
     * @return - converted .docx file content based on input string
     * @throws IOException;
     */
    byte[] getNewDocxFile(String modifiedContent) throws IOException;


    /**
     * Generates a new .py document
     * @param modifiedContent - new content
     * @return - new content converted to file
     */
    byte[] getNewPythonFile(String modifiedContent);

}
