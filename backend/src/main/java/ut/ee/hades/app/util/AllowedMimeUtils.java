package ut.ee.hades.app.util;

import lombok.Getter;
import ut.ee.hades.app.dao.entity.FileEntity;

import java.util.HashMap;
import java.util.Map;

public class AllowedMimeUtils {

    private AllowedMimeUtils() {}

    private static final String MIME_OFFICE_DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    private static final String PYTHON = "text/plain";
    private static final String SCRIPT = "text/x-sh";


    protected static final Map<String, String> mimeMap = new HashMap<>();


    static {
        mimeMap.put(MIME_OFFICE_DOCX, "docx");
        mimeMap.put(PYTHON, "py");
        mimeMap.put(SCRIPT, "sh");
    }

    public static boolean isShellType(String mimeType) {
        return SCRIPT.equals(mimeType);
    }
}