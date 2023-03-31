package ut.ee.hades.app.web.controllers.secure;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import ut.ee.hades.app.web.model.dto.LabelDTO;
import ut.ee.hades.app.web.services.LabelService;

import java.util.List;

@RestController
@RequestMapping("api")
public class LabelController {

    private final LabelService labelService;

    public LabelController(LabelService labelService) {
        this.labelService = labelService;
    }

    @GetMapping(value = "/getAllLabels")
    public @ResponseBody List<LabelDTO> getAllLabels() {
        return labelService.getAllLabels();
    }
}
