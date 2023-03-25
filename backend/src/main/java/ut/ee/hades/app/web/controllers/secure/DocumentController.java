package ut.ee.hades.app.web.controllers.secure;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ut.ee.hades.app.web.model.dto.ExerciseDTO;
import ut.ee.hades.app.web.model.dto.ManualDTO;
import ut.ee.hades.app.web.services.DocumentService;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("api")
@RequiredArgsConstructor
@Slf4j
public class DocumentController {
    private final DocumentService documentService;


    @GetMapping(value = "/getAllManuals")
    public @ResponseBody List<ManualDTO> getManualsList() {
        return documentService.getAllManuals();
    }

    @PostMapping(value = "/createManual", consumes = "multipart/form-data")
    public @ResponseBody ManualDTO saveManual(@RequestParam("file") MultipartFile multipartFile) throws IOException {
        return documentService.createManual(multipartFile);
    }

    @DeleteMapping(value = "/deleteManual/{manualId}")
    public @ResponseBody void deleteManual(@PathVariable long manualId) throws IOException {
        documentService.deleteManualById(manualId);
    }

    @PostMapping(value = "/createExercise", consumes = "multipart/form-data")
    public @ResponseBody ExerciseDTO saveExercise(@RequestParam("file") MultipartFile multipartFile) throws IOException {
        return documentService.createExercise(multipartFile);
    }

    @DeleteMapping(value = "/deleteExercise/{exerciseId}")
    public @ResponseBody void deleteExercise(@PathVariable long exerciseId) throws IOException {
        documentService.deleteExerciseById(exerciseId);
    }

    @GetMapping(path = "/download/{docId}")
    public ResponseEntity<Resource> downloadDocumentById(@PathVariable long docId) {
        return documentService.downloadDocumentById(docId);
    }
}
