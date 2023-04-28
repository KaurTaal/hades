package ut.ee.hades.app.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum UiAlertEnum {
    HADES_USER_ALREADY_REGULAR_USER("Kasutaja on juba tavakasutaja"),
    HADES_USER_ALREADY_ADMIN("Kasutaja on juba admin"),
    HADES_USER_ALREADY_DEACTIVATED("Kasutaja on juba deaktiveeritud"),
    HADES_USER_ALREADY_ACTIVATED("Kasutaja on juba aktiveeritud"),
    HADES_USER_NOT_FOUND("Kasutajat ei leitud"),
    HADES_USER_NOT_ACTIVATED("Kasutaja pole hetkel aktiveeritud"),
    HADES_USER_EXISTS_ERROR("Selle e-mailiga kasutaja on juba loodud"),
    BAD_CREDENTIALS_ERROR("Viga e-mailis või paroolis"),
    CONTENT_CONVERSION_ERROR("Sisu teisendamine ebaõnnestus"),
    FILE_SAVE_ERROR("Faili muudatuste salvestamine ebaõnnestus"),
    FILE_DOWNLOAD_ERROR("Faili allalaadimine ebaõnnestus"),
    NOT_ALLOWED_FILE_TYPE("Failitüüpi pole süsteemi veel lisatud"),
    HYPERLINK_CONVERSION_ERROR("Lingi teisendamine ebaõnnestus. Süsteem saab hetkel ainult kõige lihtsamate linkidega hakkama. Vabandame ebamugavuste pärast!"),
    INVALID_COURSE_ERROR("Kursust pole süsteemi lisatud");


    private final String name;


}
