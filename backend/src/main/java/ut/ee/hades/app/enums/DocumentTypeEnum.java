package ut.ee.hades.app.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor

//Enums must match the ones in frontend!
public enum DocumentTypeEnum {


    MANUAL("Juhend"),
    PROGRAM("Programm"),
    EXERCISE("Ülesanne");

    private final String value;


}
