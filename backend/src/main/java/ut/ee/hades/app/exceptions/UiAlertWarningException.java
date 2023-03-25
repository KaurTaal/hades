package ut.ee.hades.app.exceptions;

import lombok.Getter;
import ut.ee.hades.app.enums.ExceptionCodeEnum;
import ut.ee.hades.app.exceptions.UiAlertException;
import ut.ee.hades.app.web.model.UiAlert;

@Getter
public class UiAlertWarningException extends UiAlertException {

    public UiAlertWarningException(String message) {
        setAlert(new UiAlert(message, UiAlert.AlertType.WARNING));
    }
}



