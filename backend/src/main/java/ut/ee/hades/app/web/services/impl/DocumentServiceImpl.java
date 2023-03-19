package ut.ee.hades.app.web.services.impl;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ut.ee.hades.app.dao.repository.LabelRepository;
import ut.ee.hades.app.web.model.dto.ManualDocumentDTO;
import ut.ee.hades.app.web.model.dto.TereDTO;
import ut.ee.hades.app.web.services.DocumentService;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
public class DocumentServiceImpl implements DocumentService {

    private static final Logger log = LoggerFactory.getLogger(DocumentService.class);

    private final FileContentExtractor fileContentExtractor;

    private final LabelRepository labelRepository;

    @Autowired
    public DocumentServiceImpl(LabelRepository labelRepository, FileContentExtractor fileContentExtractor) {
        this.labelRepository = labelRepository;
        this.fileContentExtractor = fileContentExtractor;
    }

    @Override
    public List<TereDTO> getManualsList() {
        return List.of(new TereDTO("Tere"));
    }

    @Override
    public ManualDocumentDTO uploadManual(MultipartFile uploadedFile) throws IOException {

        FileContentExtractor.FileContent content = fileContentExtractor.extractText(uploadedFile.getInputStream().readAllBytes());
        ManualDocumentDTO manualDocumentDTO = new ManualDocumentDTO();
        manualDocumentDTO.setContent(content.text);
        return manualDocumentDTO;
    }



}
