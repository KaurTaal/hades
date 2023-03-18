package ut.ee.hades.app.web.services.impl;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ut.ee.hades.app.dao.repository.LabelRepository;
import ut.ee.hades.app.web.model.dto.ManualDocumentDTO;
import ut.ee.hades.app.web.model.dto.TereDTO;
import ut.ee.hades.app.web.services.ManualService;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;


@Service
public class ManualServiceImpl implements ManualService {
    private static final Logger log = LoggerFactory.getLogger(ManualService.class);

    private final LabelRepository labelRepository;

    public ManualServiceImpl(LabelRepository labelRepository) {
        this.labelRepository = labelRepository;
    }

    @Override
    public List<TereDTO> getManualsList() {
        return List.of(new TereDTO("Tere"));
    }

    @Override
    public ManualDocumentDTO createManual(MultipartFile uploadedFile) throws IOException {
        convertDocxToHtml(uploadedFile);
        return null;
    }


    private void convertDocxToHtml(MultipartFile uploadedFile) throws IOException {
        InputStream inputStream = uploadedFile.getInputStream();
        String contentType = uploadedFile.getContentType();
    }


}
