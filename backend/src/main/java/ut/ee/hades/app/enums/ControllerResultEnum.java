package ut.ee.hades.app.enums;

public enum ControllerResultEnum {
    OK,
    FAILED;

    public String getCode() {
        return this.name();
    }
}
