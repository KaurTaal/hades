package ut.ee.hades.app.web.controllers.secure;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ut.ee.hades.app.enums.ControllerResultEnum;
import ut.ee.hades.app.enums.ExceptionCodeEnum;
import ut.ee.hades.app.enums.HttpMethodEnum;
import ut.ee.hades.app.web.model.BaseResponse;
import ut.ee.hades.app.web.model.dto.ManualDTO;
import ut.ee.hades.app.web.services.ManualService;

import java.util.List;

import static ut.ee.hades.app.enums.RestApiOperations.*;

@RestController
@RequestMapping("api")
@RequiredArgsConstructor
@Slf4j
public class ManualController {
    private final ManualService manualService;


    @RequestMapping(value = "/getAllManuals", method = RequestMethod.GET)
    public @ResponseBody BaseResponse getManualsList() {
        try {
            List<ManualDTO> manualDTOList = manualService.getAllManuals();
            return new BaseResponse(manualDTOList, GET_ALL_MANUALS, HttpMethodEnum.GET, ControllerResultEnum.OK, null);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return new BaseResponse("", GET_ALL_MANUALS, HttpMethodEnum.GET, ControllerResultEnum.FAILED, ExceptionCodeEnum.GENERAL_ERROR);
        }
    }

    @RequestMapping(value = "/createManual", method = RequestMethod.POST, consumes = "multipart/form-data")
    public @ResponseBody BaseResponse saveManual(@RequestParam("file") MultipartFile multipartFile) {
        try {
            return new BaseResponse(manualService.uploadManual(multipartFile), CREATE_MANUAL, HttpMethodEnum.POST, ControllerResultEnum.OK, null);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return new BaseResponse("", CREATE_MANUAL, HttpMethodEnum.POST, ControllerResultEnum.FAILED, ExceptionCodeEnum.GENERAL_ERROR);
        }
    }

    @RequestMapping(value = "/deleteManual/{manualId}", method = RequestMethod.DELETE)
    public @ResponseBody BaseResponse deleteManual(@PathVariable long manualId) {
        try {
            manualService.deleteManualById(manualId);
            return new BaseResponse(null, DELETE_MANUAL, HttpMethodEnum.DELETE, ControllerResultEnum.OK, null);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return new BaseResponse("", DELETE_MANUAL, HttpMethodEnum.DELETE, ControllerResultEnum.FAILED, ExceptionCodeEnum.GENERAL_ERROR);
        }
    }
}
