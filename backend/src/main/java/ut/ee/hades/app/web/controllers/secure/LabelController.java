package ut.ee.hades.app.web.controllers.secure;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import ut.ee.hades.app.enums.ExceptionCodeEnum;
import ut.ee.hades.app.exceptions.UiAlertWarningException;
import ut.ee.hades.app.web.model.dto.LabelDTO;
import ut.ee.hades.app.web.services.LabelService;

import java.util.List;

import static ut.ee.hades.app.enums.ExceptionCodeEnum.*;

@RestController
@RequestMapping("api")
public class LabelController {

    private static final Logger log = LoggerFactory.getLogger(LabelController.class);

    private final LabelService labelService;

    public LabelController(LabelService labelService) {
        this.labelService = labelService;
    }

    @RequestMapping(value = "/getAllLabels", method = RequestMethod.GET)
    public @ResponseBody List<LabelDTO> getAllLabels() {
        try {
            return labelService.getAllLabels();
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new UiAlertWarningException("TEST_ERROR");
        }
    }
}
