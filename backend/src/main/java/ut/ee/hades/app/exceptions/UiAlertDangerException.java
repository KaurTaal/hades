package ut.ee.hades.app.exceptions;

import lombok.Getter;
import ut.ee.hades.app.web.model.UiAlert;

@Getter
public class UiAlertDangerException extends UiAlertException {

    public UiAlertDangerException(String message) {
        setAlert(new UiAlert(message, UiAlert.AlertType.DANGER));
    }
}



