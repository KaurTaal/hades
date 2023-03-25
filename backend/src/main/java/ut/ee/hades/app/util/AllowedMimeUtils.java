package ut.ee.hades.app.util;

import java.util.HashMap;

public class AllowedMimeUtils {

    private static final String MIME_OFFICE_DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    private static final String PYTHON = "";


    public static final HashMap<String, String> mimeMap = new HashMap<>();


    static {
        mimeMap.put(MIME_OFFICE_DOCX, "docx");
        mimeMap.put(PYTHON, "py");
    }
}