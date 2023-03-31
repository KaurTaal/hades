package ut.ee.hades.app.web.controllers.secure;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ut.ee.hades.app.exceptions.system.HADESFileDownloadException;
import ut.ee.hades.app.exceptions.system.HADESFileSaveException;
import ut.ee.hades.app.web.services.DocumentService;

import java.io.IOException;


@RestController
@RequestMapping("api")
@RequiredArgsConstructor
@Slf4j
public class DocumentController {
    private final DocumentService documentService;

    @GetMapping(path = "/download/{docId}")
    public ResponseEntity<Resource> downloadDocumentById(@PathVariable long docId) throws HADESFileDownloadException {
        return documentService.downloadDocumentById(docId);
    }

    @PostMapping(path = "/getNewDocx")
    public @ResponseBody byte[] getNewDocx(@RequestBody String modifiedContent) throws IOException {
        return documentService.getNewDocx(modifiedContent);
    }

    @PutMapping(path = "/saveEditedFile/{fileId}", consumes = "multipart/form-data")
    public @ResponseBody void saveEditedFile(@PathVariable long fileId, @RequestParam("file") MultipartFile multipartFile) throws IOException, HADESFileSaveException {
        documentService.saveEditedFile(fileId, multipartFile);
    }
}
