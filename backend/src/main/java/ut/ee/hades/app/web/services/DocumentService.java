package ut.ee.hades.app.web.services;

import org.springframework.web.multipart.MultipartFile;
import ut.ee.hades.app.web.model.dto.ManualDocumentDTO;
import ut.ee.hades.app.web.model.dto.TereDTO;

import java.io.IOException;
import java.util.List;

public interface DocumentService {
    List<TereDTO> getManualsList();

    ManualDocumentDTO uploadManual(MultipartFile manualDocumentDTO) throws IOException;
}
