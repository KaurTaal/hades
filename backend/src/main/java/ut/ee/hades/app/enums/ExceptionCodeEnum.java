package ut.ee.hades.app.enums;

public enum ExceptionCodeEnum {
    NOT_ALLOWED_FILE_TYPE("Not implemented file type detected!"),
    FILE_DOWNLOAD_ERROR("Downloading document failed!"),
    FILE_SAVE_ERROR("Saving document failed"),
    CONTENT_CONVERT_ERROR("Failed to convert content!"),
    INVALID_COURSE_ERROR("Course not added to the system!");


    private final String name;

    ExceptionCodeEnum(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
