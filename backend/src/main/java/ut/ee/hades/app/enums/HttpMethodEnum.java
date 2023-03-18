package ut.ee.hades.app.enums;

public enum HttpMethodEnum {
    GET,
    POST,
    DELETE,
    PUT;

    public String getCode() {
        return this.name();
    }
}
