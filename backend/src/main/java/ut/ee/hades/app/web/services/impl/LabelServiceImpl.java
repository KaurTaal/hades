package ut.ee.hades.app.web.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ut.ee.hades.app.dao.entity.LabelEntity;
import ut.ee.hades.app.dao.repository.LabelRepository;
import ut.ee.hades.app.web.model.dto.LabelDTO;
import ut.ee.hades.app.web.services.LabelService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LabelServiceImpl implements LabelService {

    private final LabelRepository labelRepository;

    public LabelServiceImpl(LabelRepository labelRepository) {
        this.labelRepository = labelRepository;
    }

    @Override
    public List<LabelDTO> getAllLabels() {
        List<LabelEntity> labels = labelRepository.findAll();
        return labels.stream().map(LabelDTO::map).collect(Collectors.toList());
    }
}
