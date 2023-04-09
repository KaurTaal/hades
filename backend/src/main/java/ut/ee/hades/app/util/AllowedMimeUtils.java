package ut.ee.hades.app.util;

import java.util.HashMap;
import java.util.Map;

public class AllowedMimeUtils {

    private AllowedMimeUtils() {}

    private static final String MIME_OFFICE_DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    private static final String PYTHON = "text/plain";


    protected static final Map<String, String> mimeMap = new HashMap<>();


    static {
        mimeMap.put(MIME_OFFICE_DOCX, "docx");
        mimeMap.put(PYTHON, "py");
    }
}