package ut.ee.hades.app.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ut.ee.hades.app.web.model.UiAlert;

@Getter
@Setter
public class UiAlertException extends RuntimeException {
    private UiAlert alert;
}



