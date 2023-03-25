package ut.ee.hades.app.web.services;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import ut.ee.hades.app.dao.entity.FileEntity;

public interface DownloadService {

    ResponseEntity<Resource> downloadDoc(ByteArrayResource resource, FileEntity document);

}
