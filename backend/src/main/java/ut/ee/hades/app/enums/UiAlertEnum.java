package ut.ee.hades.app.enums;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum UiAlertEnum {

    CONTENT_CONVERSION_ERROR("Sisu teisendamine ebaõnnestus!"),
    FILE_SAVE_ERROR("Faili muudatuste salvestamine ebaõnnestus!"),
    FILE_DOWNLOAD_ERROR("Faili allalaadimine ebaõnnestus"),
    NOT_ALLOWED_FILE_TYPE("Failitüüpi pole süsteemi veel lisatud!"),
    INVALID_COURSE_ERROR("Kursust pole süsteemi lisatud!");


    private final String name;


}
