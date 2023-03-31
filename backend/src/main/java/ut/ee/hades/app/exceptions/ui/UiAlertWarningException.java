package ut.ee.hades.app.exceptions.ui;

import lombok.Getter;
import ut.ee.hades.app.web.model.UiAlert;

@Getter
public class UiAlertWarningException extends UiAlertException {

    public UiAlertWarningException(String message) {
        setAlert(new UiAlert(message, UiAlert.AlertType.WARNING));
    }
}



