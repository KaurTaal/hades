package ut.ee.hades.app.enums;

public enum ExceptionCodeEnum {
    GENERAL_ERROR;

    public String getCode() {
        return this.name();
    }
}
