package ut.ee.hades.app.web.controllers.secure;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ut.ee.hades.app.enums.ControllerResultEnum;
import ut.ee.hades.app.enums.ExceptionCodeEnum;
import ut.ee.hades.app.enums.HttpMethodEnum;
import ut.ee.hades.app.web.model.BaseResponse;
import ut.ee.hades.app.web.model.dto.TereDTO;
import ut.ee.hades.app.web.services.DocumentService;

import java.util.List;

import static ut.ee.hades.app.enums.RestApiOperations.CREATE_MANUAL;
import static ut.ee.hades.app.enums.RestApiOperations.GET_ALL_MANUALS;

@RestController
@RequestMapping("api")
public class DocumentController {
    private static final Logger log = LoggerFactory.getLogger(DocumentController.class);
    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }


    @RequestMapping(value = "/getManualsList", method = RequestMethod.GET)
    public @ResponseBody BaseResponse getManualsList() {
        try {
            List<TereDTO> manualsList = documentService.getManualsList();
            return new BaseResponse(manualsList, GET_ALL_MANUALS, HttpMethodEnum.GET, ControllerResultEnum.OK, null);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return new BaseResponse("", GET_ALL_MANUALS, HttpMethodEnum.GET, ControllerResultEnum.FAILED, ExceptionCodeEnum.GENERAL_ERROR);
        }
    }

    @RequestMapping(value = "/createManual", method = RequestMethod.POST, consumes = "multipart/form-data")
    public @ResponseBody BaseResponse saveManual(@RequestParam("file") MultipartFile file) {
        try {
            return new BaseResponse(documentService.uploadManual(file), CREATE_MANUAL, HttpMethodEnum.POST, ControllerResultEnum.OK, null);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return new BaseResponse("", CREATE_MANUAL, HttpMethodEnum.POST, ControllerResultEnum.FAILED, ExceptionCodeEnum.GENERAL_ERROR);
        }
    }
}
