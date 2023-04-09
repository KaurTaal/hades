package ut.ee.hades.app.web.services.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ut.ee.hades.app.dao.entity.FileEntity;
import ut.ee.hades.app.dao.repository.FileRepository;
import ut.ee.hades.app.enums.UiAlertEnum;
import ut.ee.hades.app.exceptions.ui.UiAlertDangerException;
import ut.ee.hades.app.util.DocumentUtils;
import ut.ee.hades.app.web.services.DownloadService;
import ut.ee.hades.app.web.services.FileService;

import java.io.IOException;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class FileServiceImpl implements FileService {

    private final FileRepository fileRepository;
    private final DownloadService downloadService;


    @Override
    public void saveEditedFile(Long fileId, MultipartFile modifiedFile) throws IOException {
        Optional<FileEntity> fileById = fileRepository.findById(fileId);
        if (fileById.isPresent()) {
            FileEntity fileEntity = fileById.get();
            fileEntity.setContent(modifiedFile.getBytes());
            fileEntity.setSize(modifiedFile.getSize());
            fileRepository.save(fileEntity);
        } else {
            throw new UiAlertDangerException(UiAlertEnum.FILE_SAVE_ERROR.getName());
        }
    }


    @Override
    public ResponseEntity<Resource> downloadFileById(Long docId) {
        Optional<FileEntity> fileById = fileRepository.findById(docId);
        if (fileById.isPresent()) {
            FileEntity fileEntity = fileById.get();
            ByteArrayResource resource = new ByteArrayResource(fileEntity.getContent());
            return downloadService.downloadDoc(resource, fileEntity);
        } else {
            throw new UiAlertDangerException(UiAlertEnum.FILE_DOWNLOAD_ERROR.getName());
        }
    }


    @Override
    public byte[] getNewDocxFile(String content) throws IOException {
        return DocumentUtils.convertHtmlToDocx(content);
    }

    @Override
    public byte[] getNewPythonFile(String content) {
        return DocumentUtils.convertHtmlToPython(content);
    }


}
