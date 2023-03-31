package ut.ee.hades.app.exceptions.ui;

import lombok.Getter;
import lombok.Setter;
import ut.ee.hades.app.web.model.UiAlert;

@Getter
@Setter
public class UiAlertException extends RuntimeException {
    private transient UiAlert alert;
}



