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
import ut.ee.hades.app.enums.ExceptionCodeEnum;
import ut.ee.hades.app.exceptions.system.HADESFileDownloadException;
import ut.ee.hades.app.exceptions.system.HADESFileSaveException;
import ut.ee.hades.app.util.DocumentUtils;
import ut.ee.hades.app.web.services.FileService;
import ut.ee.hades.app.web.services.DownloadService;

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
    public void saveEditedFile(Long fileId, MultipartFile modifiedFile) throws IOException, HADESFileSaveException {
        Optional<FileEntity> fileById = fileRepository.findById(fileId);
        if (fileById.isPresent()) {
            FileEntity fileEntity = fileById.get();
            fileEntity.setContent(modifiedFile.getBytes());
            fileEntity.setSize(modifiedFile.getSize());
            fileRepository.save(fileEntity);
        } else {
            throw new HADESFileSaveException(ExceptionCodeEnum.FILE_SAVE_ERROR.getName());
        }
    }


    @Override
    public ResponseEntity<Resource> downloadFileById(Long docId) throws HADESFileDownloadException {
        Optional<FileEntity> fileById = fileRepository.findById(docId);
        if (fileById.isPresent()) {
            FileEntity fileEntity = fileById.get();
            ByteArrayResource resource = new ByteArrayResource(fileEntity.getContent());
            return downloadService.downloadDoc(resource, fileEntity);
        } else {
            throw new HADESFileDownloadException(ExceptionCodeEnum.FILE_DOWNLOAD_ERROR.getName());
        }
    }


    @Override
    public byte[] getNewDocx(String content) throws IOException {
        return DocumentUtils.convertHtmlToDocx(content);
    }


}