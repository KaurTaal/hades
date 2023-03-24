package ut.ee.hades.app.web.services.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ut.ee.hades.app.dao.entity.DocumentEntity;
import ut.ee.hades.app.dao.entity.ManualEntity;
import ut.ee.hades.app.dao.repository.DocumentRepository;
import ut.ee.hades.app.dao.repository.LabelRepository;
import ut.ee.hades.app.dao.repository.ManualRepository;
import ut.ee.hades.app.util.DocumentUtils;
import ut.ee.hades.app.web.model.dto.ManualDTO;
import ut.ee.hades.app.web.services.ManualService;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.LinkedList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ManualServiceImpl implements ManualService {

    private final LabelRepository labelRepository;
    private final DocumentRepository documentRepository;
    private final ManualRepository manualRepository;


    @Override
    public List<ManualDTO> getAllManuals() {
        List<ManualDTO> manualDTOList = new LinkedList<>();
        List<ManualEntity> manualEntityList = manualRepository.findAll();

        manualEntityList.forEach(manual -> {
            try {
                manualDTOList.add(ManualDTO.map(manual, DocumentUtils.getInputStream(manual.getDocument().getContent())));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
        return manualDTOList;
    }

    @Override
    public ManualDTO uploadManual(MultipartFile uploadedFile) throws IOException {
        ManualEntity manualEntity = new ManualEntity();
        DocumentEntity documentEntity = new DocumentEntity();

        documentEntity.setContent(uploadedFile.getBytes());
        documentEntity.setSize(uploadedFile.getSize());
        documentEntity.setMimeType(uploadedFile.getContentType());
        documentEntity.setFileName(uploadedFile.getOriginalFilename());
        manualEntity.setDocument(documentEntity);

        documentRepository.save(documentEntity);
        manualRepository.save(manualEntity);

        return ManualDTO.map(manualEntity, uploadedFile.getInputStream());
    }

    @Override
    public void deleteManualById(Long manualId) {
        manualRepository.deleteById(manualId);
    }


}
