package ut.ee.hades.app.util;

import org.zwobble.mammoth.DocumentConverter;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

public class DocumentUtils {

    public static String convertToHtml(InputStream stream) throws IOException {
        DocumentConverter converter = new DocumentConverter();
        return converter.convertToHtml(stream).getValue();
    }

    public static InputStream getInputStream(byte[] content) {
        return new ByteArrayInputStream(content);
    }
}
