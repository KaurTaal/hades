package ut.ee.hades.app.enums;

public enum ExceptionCodeEnum {
    NOT_ALLOWED_FILE_TYPE("Ebasobiv faili tüüp!"),
    FILE_DOWNLOAD_ERROR("Dokumendi alla laadimine ebaõnnestus!"),
    FILE_SAVE_ERROR("Dokumendi salvestamine ebaõnnestus!"),
    CONTENT_CONVERT_ERROR("Sisu teisendamine ebaõnnestus!");


    private final String name;

    ExceptionCodeEnum(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
