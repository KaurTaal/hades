package ut.ee.hades.app.web.services.impl;

import org.apache.tika.metadata.Metadata;
import org.apache.tika.parser.AutoDetectParser;
import org.apache.tika.sax.BodyContentHandler;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.util.Map;
import java.util.Objects;


@Service
public class FileContentExtractor {

    public FileContent extractText(byte[] file) {
        AutoDetectParser parser = new AutoDetectParser();
        BodyContentHandler handler = new BodyContentHandler(-1);
        Metadata metadata = new Metadata();
        try (ByteArrayInputStream stream = new ByteArrayInputStream(file)) {
            parser.parse(stream, handler, metadata);
            return new FileContent(handler.toString().trim());
        } catch (Throwable e) {
            System.out.println(e.getMessage());
        }
        return new FileContent("");
    }

    public static class FileContent {
        public String text;
        public Map fileMetadata;

        public FileContent(String text) {
            this.text = text;
        }
        public FileContent(String text, Map fileMetadata) {
            this.text = text;
            this.fileMetadata = fileMetadata;
        }
    }
}
