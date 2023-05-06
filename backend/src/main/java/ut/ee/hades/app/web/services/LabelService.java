package ut.ee.hades.app.web.services;

import ut.ee.hades.app.web.model.dto.LabelDTO;

import java.util.List;

public interface LabelService {

    /**
     * Retrieves all labels
     * @return - all labels
     */
    List<LabelDTO> getAllLabels();
}
