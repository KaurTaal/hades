package ut.ee.hades.app.web.services.impl;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ut.ee.hades.app.dao.entity.FileEntity;
import ut.ee.hades.app.web.services.DownloadService;


@Service
public class DownloadServiceImpl implements DownloadService {

    @Override
    public ResponseEntity<Resource> downloadDoc(ByteArrayResource resource, FileEntity document) {
        HttpHeaders httpHeaders = prepareDownload(document.getMimeType(), document.getName());
        return ResponseEntity.ok()
                .headers(httpHeaders)
                .contentLength(document.getSize())
                .contentType(MediaType.parseMediaType(document.getMimeType()))
                .body(resource);
    }

    private static HttpHeaders prepareDownload(String mimeType, String docName) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");
        headers.add("Content-Disposition", "attachment; filename=\"" + docName + "\"");
        headers.add("content-type", mimeType);
        return headers;
    }
}
