package ut.ee.hades.app.web.controllers.secure;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ut.ee.hades.app.exceptions.system.HADESInvalidCourseException;
import ut.ee.hades.app.web.model.dto.ManualDTO;
import ut.ee.hades.app.web.services.ManualService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/manual")
@RequiredArgsConstructor
@Slf4j
public class ManualController {

    private final ManualService manualService;



    @GetMapping(value = "/getAllManuals")
    public @ResponseBody List<ManualDTO> getManualsList() {
        return manualService.getAllManuals();
    }


    @PostMapping(value = "/createManual", consumes = "multipart/form-data")
    public @ResponseBody ManualDTO saveManual(@RequestParam("file") MultipartFile multipartFile, @RequestParam("year") Integer year,  @RequestParam("courseCode") String courseCode) throws IOException, HADESInvalidCourseException {
        return manualService.createManual(multipartFile, year, courseCode);
    }

    @DeleteMapping(value = "/deleteManual/{manualId}")
    public @ResponseBody void deleteManual(@PathVariable long manualId) throws IOException {
        manualService.deleteManualById(manualId);
    }


}
