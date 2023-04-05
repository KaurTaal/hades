package ut.ee.hades.app.web.services;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import ut.ee.hades.app.exceptions.system.HADESFileDownloadException;
import ut.ee.hades.app.exceptions.system.HADESFileSaveException;

import java.io.IOException;

public interface FileService {

    void saveEditedFile(Long fileId, MultipartFile modifiedFile) throws IOException, HADESFileSaveException;

    ResponseEntity<Resource> downloadFileById(Long docId) throws HADESFileDownloadException;

    byte[] getNewDocx(String modifiedContent) throws IOException;

}
