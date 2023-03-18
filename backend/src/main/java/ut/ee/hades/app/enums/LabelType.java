package ut.ee.hades.app.enums;

public enum LabelType {
    MANUAL,
    EXERCISE;

    public String getCode() {
        return this.name();
    }
}
