package ut.ee.hades.app.web.services;

import ut.ee.hades.app.web.model.dto.LabelDTO;

import java.util.List;

public interface LabelService {

    List<LabelDTO> getAllLabels();
}
