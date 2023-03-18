package ut.ee.hades.app.web.controllers.secure;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import ut.ee.hades.app.enums.ControllerResultEnum;
import ut.ee.hades.app.enums.ExceptionCodeEnum;
import ut.ee.hades.app.enums.HttpMethodEnum;
import ut.ee.hades.app.enums.RestApiOperations;
import ut.ee.hades.app.web.model.BaseResponse;
import ut.ee.hades.app.web.model.dto.LabelDTO;
import ut.ee.hades.app.web.services.LabelService;

import java.util.List;

import static ut.ee.hades.app.enums.RestApiOperations.GET_ALL_LABELS;

@RestController
@RequestMapping("api")
public class LabelController {

    private static final Logger log = LoggerFactory.getLogger(LabelController.class);

    private final LabelService labelService;

    public LabelController(LabelService labelService) {
        this.labelService = labelService;
    }

    @RequestMapping(value = "/getAllLabels", method = RequestMethod.GET)
    public @ResponseBody BaseResponse getAllLabels() {
        try {
            List<LabelDTO> labelDTOS = labelService.getAllLabels();
            return new BaseResponse(labelDTOS, GET_ALL_LABELS, HttpMethodEnum.GET, ControllerResultEnum.OK, null);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return new BaseResponse("", GET_ALL_LABELS, HttpMethodEnum.GET, ControllerResultEnum.OK, ExceptionCodeEnum.GENERAL_ERROR);
        }
    }
}
